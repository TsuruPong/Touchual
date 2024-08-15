"use client"

import { Hiragana } from "@/components/containers/const/hiragana/hiragana";
import { ILetter } from "@/domains/sentences/letter";

export const useACS = (letter: ILetter, collects: string[]): string => {
    let predicts: string[] = [];
    let l: ILetter = letter;
    let n: number = 0;
    while (l) {
        let moraNodes = l.getMoraTreeNodes().find((m) => m.getValue() == collects[n]) ?? l.getMoraTreeNodes()[0];
        // 前回が「っ」
        if (l.getPrev()?.getWord().getWord() == Hiragana.XTU) {
            if (l.getMoraTreeNodes().some((t) => t.getValue() == predicts[predicts.length - 1])) {
                const current = l.getMoraTreeNodes().find((t) => t.getValue() == predicts[predicts.length - 1]);
                if (current) {
                    moraNodes = current; 
                }
            }
        }
        // カレントが「ん」
        if (l.getWord().getWord() == Hiragana.N) {
            const next = l.getNext();
            /*
            collects[n] == "n"かつ
            collects[n + 1] != "n"(「ん」の入力が「n」キーのみの場合)かつ
            collects[n + 1]の値が次の要素に含まれている
            */
            if (collects[n] == "n" && collects[n + 1] != "n" && next && next.getMoraTreeNodes().some((t) => t.getValue() == collects[n + 1])) {
                predicts.push("n");
                n++;
                l = next;
                continue;
            }
        }
  
        while (moraNodes) {
            predicts.push(moraNodes.getValue());
            n++;
            moraNodes = moraNodes.getNext().find((m) => m.getValue() == collects[n]) ?? moraNodes.getNext()[0];
        }
  
        const next = l.getNext();
        if (!next) break;
        l = next;
      }

      return predicts.join("");
}
