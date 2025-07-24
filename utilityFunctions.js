function addNumbers(a, b) {
    return a + b;
}

console.log("Sum of 5 and 3 is:", addNumbers(5, 3));

function checkEvenOrOdd(num) {
    return num % 2 === 0 ? 'Even' : 'Odd';
}

console.log("4 is:", checkEvenOrOdd(4));

function sortNumbers(arr) {
    return arr.sort((a, b) => a - b);
}

console.log("Sorted array:", sortNumbers([5, 2, 8, 1, 4]));

function calculateFrequency(arr){
    const frequency = {};
    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });
    return frequency;
}

console.log("Frequency of elements:", calculateFrequency([1, 2, 2, 3, 3, 3]));

function reverseText(str) {
    return str.split('').reverse().join('');
}

console.log("Reversed string:", reverseText("Hello World"));

function findMaxOfThree(a, b, c) {
    return Math.max(a, b, c);
}

console.log("Maximum of 10, 20, and 15 is:", findMaxOfThree(10, 20, 15));

function calculateFactorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * calculateFactorial(n - 1);
}

console.log("Factorial of 5 is:", calculateFactorial(5));

function checkPalindrome(str) {
    return str === str.split('').reverse().join('');
}

console.log("Is 'racecar' a palindrome?:", checkPalindrome("racecar"));

function countVowelCharacters(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

console.log("Number of vowels in 'Hello World':", countVowelCharacters("Hello World"));

function sumArrayElements(arr){
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum;
}

console.log("Sum of array elements:", sumArrayElements([1, 2, 3, 4, 5]));

function isPrimeNumber(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log("Is 7 a prime number?:", isPrimeNumber(7));

function createMultiplicationTable(num) {
    let table = [];
    for (let i = 1; i <= 10; i++) {
        table.push(`${num} x ${i} = ${num * i}`);
    }
    return table;
}

console.log("Multiplication table for 5:", createMultiplicationTable(5));