const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("seeding data...");
    await prisma.sentences.create({
        data: {
            text: "赤パジャマ青パジャマ気パジャマ",
            ruby: "あかぱじゃまあおぱじゃまきぱじゃま",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "生麦生米生卵",
            ruby: "なまむぎなまごめなまたまご",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "隣の客はよく柿食う客だ",
            ruby: "となりのきゃくはよくかきくうきゃくだ",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "すももも桃ももものうち桃もすももも桃のうち",
            ruby: "すもももももももものうちもももすももももものうち",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "新人歌手新春シャンソンショー",
            ruby: "しんじんかしゅしんしゅんしゃんそんしょー",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "坊主が屏風に上手に坊主の絵を描いた",
            ruby: "ぼうずがびょうぶにじょうずにぼうずのえをかいた",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "竹藪に竹立てかけた",
            ruby: "たけやぶにたけたてかけた",
        },
    });
    await prisma.sentences.create({
        data: {
            text: "抜きにくい釘引き抜きにくい釘釘抜きで抜く釘",
            ruby: "ぬきにくいくぎひきぬきにくいくぎくぎぬきでぬくくぎ",
        },
    });
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    console.log("compleate!");
    await prisma.$disconnect();
})