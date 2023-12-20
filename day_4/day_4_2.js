const fs = require('fs/promises');
 const readFile = async () => {
     try {
         const data = await fs.readFile('input.txt', 'utf8');
         return data.split('\n')
     } catch (error) {
         console.error('Error reading file:', error);
     }
};
const cardSeparator = (card) => {
    //cut the title, remove all the unnecessary spaces for the card
    return [card[0].replace(/Card\s*\d+: /, "").trim().split(/\s+/g,), card[1].trim().split(/\s+/g)]
}
let totalCards;

const scratchCardsCopies = async () => {
    const res =  await readFile()

    const cards = res.map( c => c.split("|"))

    totalCards = Array(cards.length).fill(1)


    for(let i = 0; i < cards.length; i++){
        const [winning, numbers] = cardSeparator(cards[i])

        let amountOfCopies = 0

        numbers.forEach(n => {
            if(winning.indexOf(n) !== -1){
                amountOfCopies += 1
            }
        })

        for (let j = i + 1; j <= i + amountOfCopies; j++) {
            totalCards[j] += totalCards[i];
        }
    }

    console.log(totalCards.reduce((a, x) => a + x, 0));
}

scratchCardsCopies()

