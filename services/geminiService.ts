import { teluguBibleData } from '../data/teluguBible';
import type { DailyVerse } from '../types';

export const getRandomVerse = (): DailyVerse => {
    const allBooks = [...teluguBibleData.oldTestament, ...teluguBibleData.newTestament];
    
    // Select a random book
    const randomBookIndex = Math.floor(Math.random() * allBooks.length);
    const randomBook = allBooks[randomBookIndex];

    // Select a random chapter from the book
    const randomChapterIndex = Math.floor(Math.random() * randomBook.chapters.length);
    const randomChapter = randomBook.chapters[randomChapterIndex];
    
    // Ensure the chapter is not empty
    if (!randomChapter || randomChapter.length === 0) {
        // Fallback to a default verse if a chapter is empty
        return {
            text: "దేవుడు లోకమును ఎంతో ప్రేమించెను. కాగా ఆయన తన అద్వితీయకుమారునిగా పుట్టిన వానియందు విశ్వాసముంచు ప్రతివాడును నశింపక నిత్యజీవము పొందునట్లు ఆయనను అనుగ్రహించెను.",
            reference: "యోహాను సువార్త 3:16",
            bookName: "యోహాను సువార్త",
            chapterIndex: 2,
            verseIndex: 15
        };
    }

    // Select a random verse from the chapter
    const randomVerseIndex = Math.floor(Math.random() * randomChapter.length);
    const randomVerse = randomChapter[randomVerseIndex];

    const parts = randomVerse.split('.');
    const verseNum = parts[0];
    const verseText = parts.slice(1).join('.').trim();

    return {
        text: verseText,
        reference: `${randomBook.name} ${randomChapterIndex + 1}:${verseNum}`,
        bookName: randomBook.name,
        chapterIndex: randomChapterIndex,
        verseIndex: randomVerseIndex
    };
};
