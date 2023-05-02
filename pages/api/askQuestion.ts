'use client'

import admin  from 'firebase-admin';
import { serverTimestamp } from 'firebase/firestore';
import { Session } from 'next-auth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryAPI';
import { adminDb } from '../../firebaseAdmin';


type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session} = req.body;

    if(!prompt) {
        res.status(400).json({ answer: "please provide a prompt" });
        return;
    }

    if(!chatId) {
        res.status(400).json({
            answer: "please provide a valid chat ID!"
        });
        return;
    }

    // chat gpt Query
    const response = await query(prompt, chatId, model);
    const message: Message = {
      text: response || "chat gpt was unable to find an answer for that!",
      createAt: admin.firestore.Timestamp.now(),
      user: {
          _id : "chatGPT",
          name: "chatGPT",
          avata: "https://links.papareact.com/2i6"
      }
    }

    await adminDb.collection("users")
    .doc('user3')
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

 res.status(200).json({ answer: message.text })
}
