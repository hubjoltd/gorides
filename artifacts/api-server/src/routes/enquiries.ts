import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { CreateEnquiryBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SMTP_HOST = process.env["SMTP_HOST"] ?? "smtp.gmail.com";
const SMTP_PORT = Number(process.env["SMTP_PORT"] ?? "465");
const SMTP_USER = process.env["SMTP_USER"];
const SMTP_PASS = process.env["SMTP_PASS"];
const SMTP_FROM = process.env["SMTP_FROM"] ?? SMTP_USER;
const ENQUIRY_TO_EMAIL =
  process.env["ENQUIRY_TO_EMAIL"] ?? "Goridesindia@gmail.com";
const WHATSAPP_PHONE = process.env["WHATSAPP_PHONE"] ?? "918217026324";

function createWhatsAppUrl(data: CreateEnquiryData): string {
  const message = [
    "Hello GoRides India, I’d like to enquire about",
    `${data.service.toLowerCase()}.`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Route: Bengaluru to ${data.route}`,
    `Travel date: ${data.date || "Flexible"}`,
    `Travellers: ${data.passengers}`,
    `Vehicle preference: ${data.vehicle || "Help me choose"}`,
    `Notes: ${data.notes || "None"}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

type CreateEnquiryData = ReturnType<typeof CreateEnquiryBody.parse>;

router.post("/enquiries", async (req, res) => {
  const parsed = CreateEnquiryBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      error: "Please check the enquiry details and try again.",
      issues: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  if (!SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    res.status(503).json({
      error:
        "Email delivery is not configured. Add SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    });
    return;
  }

  const data = parsed.data;
  const enquiryText = [
    "New GoRides India enquiry",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    `Route: Bengaluru to ${data.route}`,
    `Travel date: ${data.date || "Flexible"}`,
    `Travellers: ${data.passengers}`,
    `Vehicle preference: ${data.vehicle || "Help me choose"}`,
    `Notes: ${data.notes || "None"}`,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM,
      to: ENQUIRY_TO_EMAIL,
      replyTo: data.email,
      subject: `GoRides enquiry — ${data.route}`,
      text: enquiryText,
    });

    res.status(202).json({
      status: "accepted",
      whatsappUrl: createWhatsAppUrl(data),
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to send GoRides enquiry email");
    res.status(503).json({
      error:
        "We could not send the enquiry email right now. Please try again or use WhatsApp.",
    });
  }
});

export default router;