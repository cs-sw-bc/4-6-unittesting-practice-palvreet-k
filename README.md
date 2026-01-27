# 🅿️ Parking Lot Billing System — Unit Testing Assignment

## Goal

In this assignment, you will **practice writing unit tests using Mocha and Chai** by testing the logic of a **Parking Lot Billing System**.

Instead of building everything from scratch manually, you will:

* Use **AI (GitHub Copilot or ChatGPT)** to generate a *base application*
* Then **validate the AI-generated logic by writing your own test cases**

This mirrors real-world development, where AI can help you write code — but **you are responsible for verifying that the code is correct**.

---

## Why this assignment matters

AI can generate code quickly.
AI can also generate **wrong logic**.

Your job as a developer is to:

* Question assumptions
* Catch edge cases
* Prove correctness using tests

> The more AI you use, the **more important testing becomes**.

---

## What you will build

You will generate a **small Express MVC application** that models a **Parking Lot Billing System**.

The app should include **multiple business-logic functions**, such as:

* Calculating parking duration
* Calculating parking fees
* Applying caps, discounts, or penalties
* Calculating final payable amount

⚠️ **Important:**
The application logic may contain **bugs or incorrect assumptions**.
That is intentional.

---

## Step 1: Generate the base project using AI

You may use:

* **GitHub Copilot**
* Or ChatGPT in the browser (if you run out of Copilot credits)

### ❗ Rules

* You **must not** generate test cases using AI
* You **may** generate application code using AI
* You **must understand** the generated code before testing it

---

### 📌 Prompt to use with ChatGPT / Copilot

Copy and paste the prompt below into your AI tool:

```
Act as a senior Node.js instructor.

Build a small Express MVC application in ES Module syntax (import / export) with NO database (use in-memory data only).

The application should model a Parking Lot Billing System and be designed specifically for unit testing with Mocha and Chai.

Technical constraints:
- Node.js + Express
- MVC structure (routes / controllers / models)
- Business logic must live in models, not controllers
- No authentication, no database, no external APIs
- Keep logic simple and synchronous

Required functionality (models layer):
Create at least 7 pure, testable functions, such as:
1. Calculate parking duration from entry and exit times
2. Calculate base parking fee based on duration
3. Round parking time to billable hours
4. Apply maximum daily cap
5. Apply lost ticket fee
6. Apply discount or promo code
7. Calculate final payable amount (including tax)

IMPORTANT:
- At least 3 functions must contain intentional logical bugs
- Bugs should be subtle (rounding, order of operations, edge cases)
- Do NOT label or comment on the bugs

Output requirements:
- Show the complete folder structure
- Provide complete code files
- Use clear function names
- Add brief comments explaining what each function is intended to do
```

---

## Step 2: Write unit tests (this is the core of the assignment)

Once your project is generated:

1. Install **Mocha** and **Chai**
2. Create a `/test` directory
3. Write **unit tests for the model functions**

### Do NOT use AI to generate test cases

You must:

* Decide what correct behavior should be
* Identify edge cases
* Write assertions yourself

> If your tests all pass on the first run, your tests are probably too weak.

---

## Suggested questions to ask while testing

* What happens with **negative time**?
* What if exit time is before entry time?
* Should discounts apply **before or after caps**?
* Can the final amount ever be negative?
* Are rounding rules applied consistently?

These questions should turn into test cases.

---

## 🏁 Final note

This assignment is not about:

* Building a perfect app
* Writing lots of code

It *is* about:

* Thinking critically
* Writing meaningful tests
* Learning how to **verify AI-generated code**

> **Tests are how you keep control when AI writes code for you.**

Good luck 🙂
