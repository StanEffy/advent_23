const fs = require('fs/promises');
 const readFile = async () => {
     try {
         const data = await fs.readFile('input.txt', 'utf8');
         return data.split('\n')
     } catch (error) {
         console.error('Error reading file:', error);
     }
};

const scratchCards = async () => {
    const res =  await readFile()

    const cards = res.map( c => c.split("|"))

    const cardSeparator = (card) => {
        //cut the title, remove all the unnecessary spaces for the card
        return [card[0].replace(/Card\s*\d+: /, "").trim().split(/\s+/g,), card[1].trim().split(/\s+/g)]
    }

    let total = 0

    cards.map(c => {
        const [winning, numbers] = cardSeparator(c)

        let current = 0

        numbers.forEach(n => {
            if(winning.indexOf(n) !== -1){
                current === 0 ? current += 1: current *= 2
            }
        })

        total += current
    })

    console.log(total)

    return 0
}

scratchCards()