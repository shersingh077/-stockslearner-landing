import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import {
  CHAT_IMAGE_BUCKET,
  CHAT_IMAGE_TYPES,
  MAX_CHAT_IMAGE_SIZE,
  isChatImageType,
} from "@/lib/chat-upload";

export const runtime = "nodejs";

function getClientId(token: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0) return null;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  if (signature !== expected) return null;

  try {
    return Buffer.from(payload, "base64url").toString("utf8") || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const clientToken = cookieStore.get("client_session")?.value;
    const clientId = clientToken ? getClientId(clientToken) : null;

    if (!clientId) {
      return NextResponse.json(
        { error: "Please login to attach a photo." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const fileType = String(body?.file_type ?? "");
    const fileSize = Number(body?.file_size);
    const fileName = String(body?.file_name ?? "").trim();

    if (!isChatImageType(fileType)) {
      return NextResponse.json(
        { error: "Only JPG, PNG and WEBP images are allowed." },
        { status: 400 },
      );
    }

    if (
      !Number.isSafeInteger(fileSize) ||
      fileSize < 1 ||
      fileSize > MAX_CHAT_IMAGE_SIZE
    ) {
      return NextResponse.json(
        { error: "Choose an image that is 10 MB or smaller." },
        { status: 400 },
      );
    }

    if (!fileName || fileName.length > 255) {
      return NextResponse.json(
        { error: "The image filename is invalid." },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecret = process.env.SUPABASE_SECRET_KEY;
    if (!supabaseUrl || !supabaseSecret) {
      console.error("Chat image upload is missing Supabase configuration.");
      return NextResponse.json(
        { error: "Photo upload is temporarily unavailable." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseSecret);
    const storage = supabase.storage.from(CHAT_IMAGE_BUCKET);
    const { data: bucket, error: bucketError } =
      await supabase.storage.getBucket(CHAT_IMAGE_BUCKET);

    if (bucketError || !bucket) {
      console.error("CHAT UPLOAD BUCKET ERROR:", bucketError);
      return NextResponse.json(
        { error: "Photo storage is unavailable. Please try again later." },
        { status: 503 },
      );
    }

    const allowedTypes = bucket.allowed_mime_types;
    const needsPolicyUpdate =
      bucket.file_size_limit !== MAX_CHAT_IMAGE_SIZE ||
      (allowedTypes !== null &&
        allowedTypes !== undefined &&
        CHAT_IMAGE_TYPES.some((type) => !allowedTypes.includes(type)));

    if (needsPolicyUpdate) {
      const { error: updateError } = await supabase.storage.updateBucket(
        CHAT_IMAGE_BUCKET,
        {
          public: bucket.public,
          fileSizeLimit: MAX_CHAT_IMAGE_SIZE,
          allowedMimeTypes: allowedTypes
            ? [...new Set([...allowedTypes, ...CHAT_IMAGE_TYPES])]
            : undefined,
        },
      );

      if (updateError) {
        console.error("CHAT UPLOAD BUCKET CONFIG ERROR:", updateError);
        return NextResponse.json(
          {
            error:
              "Photo storage could not be configured for images up to 10 MB. Please contact support.",
          },
          { status: 503 },
        );
      }
    }

    const extension =
      fileType === "image/png"
        ? "png"
        : fileType === "image/webp"
          ? "webp"
          : "jpg";
    const path = `${clientId}/${crypto.randomUUID()}.${extension}`;
    const { data, error } = await storage.createSignedUploadUrl(path, {
      upsert: false,
    });

    if (error || !data) {
      console.error("CHAT SIGNED UPLOAD URL ERROR:", error);
      return NextResponse.json(
        { error: "Could not start the photo upload. Please try again." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
      path: data.path,
      fileName: fileName.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 255),
      fileType,
      maxFileSize: MAX_CHAT_IMAGE_SIZE,
    });
  } catch (error) {
    console.error("CHAT IMAGE UPLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Unable to start the photo upload." },
      { status: 500 },
    );
  }
}
