import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type sentence = {
    text: string,
    ruby: string
    level: number,
    difficulty: number
}

async function main() {
    const sentences: sentence[] = [
        {
            text: "赤パジャマ青パジャマ気パジャマ",
            ruby: "あかぱじゃまあおぱじゃまきぱじゃま",
            level: 1,
            difficulty: 1.0
        },
        {
            text: "生麦生米生卵",
            ruby: "なまむぎなまごめなまたまご",
            level: 1,
            difficulty: 1.1
        },
        {
            text: "隣の客はよく柿食う客だ",
            ruby: "となりのきゃくはよくかきくうきゃくだ",
            level: 1,
            difficulty: 1.2
        },
        {
            text: "すももも桃ももものうち桃もすももも桃のうち",
            ruby: "すもももももももものうちもももすももももものうち",
            level: 2,
            difficulty: 2.0
        },
        {
            text: "新人歌手新春シャンソンショー",
            ruby: "しんじんかしゅしんしゅんしゃんそんしょー",
            level: 2,
            difficulty: 2.1
        },
        {
            text: "坊主が屏風に上手に坊主の絵を描いた",
            ruby: "ぼうずがびょうぶにじょうずにぼうずのえをかいた",
            level: 2,
            difficulty: 2.2
        },
        {
            text: "竹藪に竹立てかけた",
            ruby: "たけやぶにたけたてかけた",
            level: 3,
            difficulty: 3.0
        },
        {
            text: "抜きにくい釘引き抜きにくい釘釘抜きで抜く釘",
            ruby: "ぬきにくいくぎひきぬきにくいくぎくぎぬきでぬくくぎ",
            level: 3,
            difficulty: 3.1
        },
    ];
    await prisma.sentenceIndicators.deleteMany({});
    await prisma.sentences.deleteMany({});

    try {
        for (const sentence of sentences) {
            await prisma.sentences.create({
                data: {
                    text: sentence.text,
                    ruby: sentence.ruby
                }
            })
            await prisma.sentenceIndicators.create({
                data: {
                    text: sentence.text,
                    ruby: sentence.ruby,
                    level: sentence.level,
                    difficulty: sentence.difficulty
                }
            })
        }
    } catch(e: any) {
        if (e.code == "P2002") {
            throw e;
        }
    }

}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})