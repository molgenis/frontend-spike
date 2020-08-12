/**
 *  Source: https://github.com/ts95/lang-detector
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2015 Toni Sučić
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.

 * A checker is an object with the following form:
 *  { pattern: /something/, points: 1 }
 * or if the pattern only matches code near the top of a given file:
 *  { pattern: /something/, points: 2, nearTop: true }
 *
 * Key: Language name.
 * Value: Array of checkers.
 *
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus points:   Almost unique to a given language.
 *  1 = Regular point:  Not unique to a given language.
 * -1 = Penalty point:  Does not match a given language.
 * Rare:
 * -50 = Bonus penalty points: Only used when two languages are mixed together,
 *  and one has a higher precedence over the other one.
 */
let languages = {
    CSS: [
        // Properties
        // eslint-disable-next-line
      {pattern: /[a-z\-]+:(?!:).+;/, points: 2},
        // <style> tag from HTML
        { pattern: /<(\/)?style>/, points: -50 },
    ],
    HTML: [
        { pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, points: 2, nearTop: true },
        // Tags
        { pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2 },
        // Properties
        // eslint-disable-next-line
      {pattern: /[a-z\-]+=("|').+("|')/g, points: 2},
        // PHP tag
        { pattern: /<\?php/, points: -50 },
    ],
    JavaScript: [
        // undefined keyword
        { pattern: /undefined/g, points: 2 },
        // console.log('ayy lmao')
        { pattern: /console\.log( )*\(/, points: 2 },
        // Variable declaration
        { pattern: /(var|const|let)( )+\w+( )*=?/, points: 2 },
        // Array/Object declaration
        // eslint-disable-next-line
      {pattern: /(('|").+('|")( )*|\w+):( )*[{\[]/, points: 2},
        // === operator
        { pattern: /===/g, points: 1 },
        // !== operator
        { pattern: /!==/g, points: 1 },
        // Function definition
        // eslint-disable-next-line
      {pattern: /function\*?(( )+[\$\w]+( )*\(.*\)|( )*\(.*\))\n?[\t ]*{/g, points: 2},
        // null keyword
        { pattern: /null/g, points: 1 },
        // lambda expression
        { pattern: /\(.*\)( )*=>( )*.+/, points: 1 },
        // (else )if statement
        { pattern: /(else )?if( )+\(.+\)/, points: 1 },
        // while loop
        { pattern: /while( )+\(.+\)/, points: 1 },
        // C style variable declaration.
        { pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
        // pointer
        { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
        // HTML <script> tag
        { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, points: -50 },
    ],
    Python: [
        // Function definition
        { pattern: /def( )+\w+\(.*\)( )*:/, points: 2 },
        // while loop
        { pattern: /while (.+):/, points: 2 },
        // from library import something
        // eslint-disable-next-line
        {pattern: /from [\w\.]+ import (\w+|\*)/, points: 2},
        // class keyword
        { pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
        // if keyword
        { pattern: /if( )+(.+)( )*:/, points: 2 },
        // elif keyword
        { pattern: /elif( )+(.+)( )*:/, points: 2 },
        // else keyword
        { pattern: /else:/, points: 2 },
        // for loop
        { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):/, points: 2 },
        // Python variable declaration.
        { pattern: /\w+( )*=( )*\w+(?!;)(\n|$)/, points: 1 },
        // import something
        // eslint-disable-next-line
        {pattern: /import ([[^\.]\w])+/, points: 1, nearTop: true},
        // print statement/function
        { pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
        // &&/|| operators
        { pattern: /(&{2}|\|{2})/, points: -1 },
    ],
    R: [
        // undefined keyword for numbers
        { pattern: /NaN/g, points: 2 },
        // undefined keyword for strings
        { pattern: /NA/g, points: 2 },
        // print statement
        { pattern: /print\(.*\)/, points: 1 },
        // Variable declaration
        { pattern: /\w+ ?<-/, points: 10 },
        // Vector declaration
        { pattern: /c\(.*\)/, points: 2 },
        // == operator
        { pattern: /==/g, points: 1 },
        // != operator
        { pattern: /!=/g, points: 1 },
        // Function definition
        { pattern: /function ?\((.*\n)*?\n?[\t ]*{/g, points: 1 },
        // null keyword
        { pattern: /NULL/g, points: 2 },
        // (else )if statement
        { pattern: /((else )|([\n \t]+))if ?\(!?.+\)\n?[\t ]*{?/, points: 2 },
        // while loop
        { pattern: /while\(.+\).*\n?[\t ]*{/, points: 1 },
    ],

    'Unknown': [],
}

const getPoints = (lineOfCode, checkers) => {
    const mappedCheckers = checkers.map((checker) => {
        return checker.pattern.test(lineOfCode) ? checker.points : 0
    })
    return mappedCheckers.reduce((memo, num) => {
        return memo + num
    }, 0)
}

const nearTop = (index, linesOfCode) => {
    return linesOfCode.length <= 10 ? true : index < linesOfCode.length / 10
}

export default (snippet, { heuristic = true, statistics = false } = {}) => {
    const opts = { heuristic, statistics  }

    let linesOfCode = snippet
        .replace(/\r\n?/g, '\n')
        .replace(/\n{2,}/g, '\n')
        .split('\n')

    if (opts.heuristic && linesOfCode.length > 500) {
        linesOfCode = linesOfCode.filter((lineOfCode, index) => {
            return nearTop(index, linesOfCode) ? true : index % Math.ceil(linesOfCode.length / 500) === 0
        })
    }

    const pairs = Object.keys(languages).map((key) => {
        return { checkers: languages[key], language: key }
    })

    const results = pairs.map((pairs) => {
        const language = pairs.language
        const checkers = pairs.checkers

        if (language === 'Unknown') {
            return { language: 'Unknown', points: 1 }
        } else {
            const pointsList = linesOfCode.map((lineOfCode, index) => {
                return !nearTop(index, linesOfCode) ? (
                    getPoints(lineOfCode, checkers.filter((checker) => !checker.nearTop))
                ) : (
                    getPoints(lineOfCode, checkers)
                )
            })

            const points = pointsList.reduce((memo, num) => memo + num)

            return { language: language, points: points }
        }
    })

    const bestResult = results.reduce((result1, result2) => {
        return result1.points > result2.points ? result1 : result2
    })

    if (opts.statistics) {
        let statistics = {}

        for (let _i = 0; _i < results.length; _i++) {
            let result = results[_i]
            statistics[result.language] = result.points
        }

        return { detected: bestResult.language, statistics: statistics }
    } else {
        return bestResult.language
    }
}
