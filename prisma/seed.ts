import prisma from "@/libs/prisma/db";

async function main() {
    console.log("seeding data...");
    await prisma.sentences.createMany({
        data: [
            {
                text: "赤パジャマ青パジャマ気パジャマ",
                ruby: "あかぱじゃまあおぱじゃまきぱじゃま",
            },
            {
                text: "生麦生米生卵",
                ruby: "なまむぎなまごめなまたまご",
            },
            {
                text: "隣の客はよく柿食う客だ",
                ruby: "となりのきゃくはよくかきくうきゃくだ",
            },
            {
                text: "すももも桃ももものうち桃もすももも桃のうち",
                ruby: "すもももももももものうちもももすももももものうち",
            },
            {
                text: "新人歌手新春シャンソンショー",
                ruby: "しんじんかしゅしんしゅんしゃんそんしょー",
            },
            {
                text: "坊主が屏風に上手に坊主の絵を描いた",
                ruby: "ぼうずがびょうぶにじょうずにぼうずのえをかいた",
            },
            {
                text: "竹藪に竹立てかけた",
                ruby: "たけやぶにたけたてかけた",
            },
            {
                text: "抜きにくい釘引き抜きにくい釘釘抜きで抜く釘",
                ruby: "ぬきにくいくぎひきぬきにくいくぎくぎぬきでぬくくぎ",
            },
        ]
    })
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async() => {
    console.log("compleate!");
    await prisma.$disconnect();
})