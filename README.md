# Coins Catalog

Welcome to the Coins Catalog project! This project is designed to provide a comprehensive catalog of coins. 

## Table of Contents

- Getting Started
- Prerequisites
- Installation
- Usage
- Contributing
- License
- Contact


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js
- You have a `<Windows/Linux/Mac>` machine.

### Installation

To install the Coins Catalog, follow these steps:

1. Clone the repo
```bash
git clone https://github.com/MohamedAbirou/fevertokens-tech-test.git
```

2. Navigate to the project directory
```bash
cd coins-catalog
```

3. Install the dependencies
```bash
pnpm install
```

### Usage

After installation, you have to build the project in the following way:

```bash
pnpm run build
```

After building, you can access the coins catalog in the following way:

```bash
pnpm run start
```

### Live Demo

You can check out the live demo of the project here:

[BitBoard](https://bitboard-liam-piro.vercel.app/)

### Contributing

We welcome contributions! Please see our Contributing Guidelines for more details.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Contact

If you want to contact me, you can reach me at <abiroumohamed58@gmail.com>.


### Task 2

1st chosen language: Python

```bash
for i in range(1, 101):
    output = ""
    if i % 3 == 0:
        output += "Hello"
    if i % 5 == 0:
        output += "World"
    if i % 7 == 0:
        output += "Yoo"
    if output == "":
        output = i
    print(output, end=", ")
```

#### Output:

1, 2, Hello, 4, World, Hello, Yoo, 8, Hello, World, 11, Hello, 13, Yoo, HelloWorld, 16, 17, Hello, 19, World, HelloYoo, 22, 23, Hello, World, 26, Hello, Yoo, 29, HelloWorld, 31, 32, Hello, 34, WorldYoo, Hello, 37, 38, Hello, World, 41, HelloYoo, 43, 44, HelloWorld, 46, 47, Hello, Yoo, World, Hello, 52, 53, Hello, World, Yoo, Hello, 58, 59, HelloWorld, 61, 62, HelloYoo, 64, World, Hello, 67, 68, Hello, WorldYoo, 71, Hello, 73, 74, HelloWorld, 76, Yoo, Hello, 79, World, Hello, 82, 83, HelloYoo, World, 86, Hello, 88, 89, HelloWorld, Yoo, 92, Hello, 94, World, Hello, 97, Yoo, Hello, World, 

2nd chosen language: Javascript

```bash
let results = [];
for (let i = 1; i <= 100; i++) {
  let output = "";
  if (i % 3 === 0) {
    output += "Hello";
  }
  if (i % 5 === 0) {
    output += "World";
  }
  if (i % 7 === 0) {
    output += "Yoo";
  }
  if (output === "") {
    output = i;
  }
  results.push(output);
}
console.log(results.join(", "));
```

#### Output:

1, 2, Hello, 4, World, Hello, Yoo, 8, Hello, World, 11, Hello, 13, Yoo, HelloWorld, 16, 17, Hello, 19, World, HelloYoo, 22, 23, Hello, World, 26, Hello, Yoo, 29, HelloWorld, 31, 32, Hello, 34, WorldYoo, Hello, 37, 38, Hello, World, 41, HelloYoo, 43, 44, HelloWorld, 46, 47, Hello, Yoo, World, Hello, 52, 53, Hello, World, Yoo, Hello, 58, 59, HelloWorld, 61, 62, HelloYoo, 64, World, Hello, 67, 68, Hello, WorldYoo, 71, Hello, 73, 74, HelloWorld, 76, Yoo, Hello, 79, World, Hello, 82, 83, HelloYoo, World, 86, Hello, 88, 89, HelloWorld, Yoo, 92, Hello, 94, World, Hello, 97, Yoo, Hello, World


### Task 3:

Concerning the 3rd task, i've thought of 2 possible solution or strategies of a solution:

#### 1st strategy is the traffic lights:

I was inspired by the color scheme of our vehicles: my car is green and my friend’s car is red. This immediately brought to mind the sequence of traffic lights. Typically, the order from top to bottom is red, orange, and green. However, if we were to rotate this image by -45 degrees along the y-axis, the order would reverse to green, amber, and red. Drawing a parallel to our situation, I interpreted this as a signal to continue in the forward direction towards the red car, which represents my friend’s vehicle. I am confident that by following this strategy, I will successfully locate my friend’s car.

#### 2nd strategy is the proactive scanning:

Assuming that my car has infinite gas and that i can't leave the highway, i'll start by choosing a direction on the highway and drive for a specific distance or time for example 1 hour or 60Km, if i don't find my friend's car in that distance or time, i'll turn around and drive back past my starting point to an equal distance on the other side of the highway so it'll be 120Km if i chose 60Km, if i still haven't found my friend's car, i'll turn around again and drive the other way. This time, however, i’ll drive for twice the base unit of distance or time, so if it's 60Km or 1 hour, it'll be 240Km or 4 hours and so on... So basically, by using this strategy, i'll make sure that i cover an increasingly larger stretch of the highway in both directions until i find my friend's car.
