export const PLAYGROUND_THEMES = [
  { id: "catppuccin", label: "Catppuccin" },
  { id: "tokyonight", label: "Tokyo Night" },
  { id: "gruvbox", label: "Gruvbox" },
  { id: "nord", label: "Nord" },
  { id: "dracula", label: "Dracula" },
] as const;

export type PlaygroundTheme = (typeof PLAYGROUND_THEMES)[number]["id"];

export const DEFAULT_THEME: PlaygroundTheme = "catppuccin";

type MonacoThemeData = {
  base: "vs" | "vs-dark" | "hc-black" | "hc-light";
  inherit: boolean;
  rules: { token: string; foreground: string; fontStyle?: string }[];
  colors: Record<string, string>;
};

export const MONACO_THEMES: Record<PlaygroundTheme, MonacoThemeData> = {
  catppuccin: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6c7086", fontStyle: "italic" },
      { token: "keyword", foreground: "cba6f7" },
      { token: "string", foreground: "a6e3a1" },
      { token: "number", foreground: "fab387" },
      { token: "type", foreground: "89b4fa" },
      { token: "function", foreground: "89b4fa" },
      { token: "variable", foreground: "cdd6f4" },
      { token: "constant", foreground: "fab387" },
      { token: "operator", foreground: "89dceb" },
    ],
    colors: {
      "editor.background": "#1e1e2e",
      "editor.foreground": "#cdd6f4",
      "editor.lineHighlightBackground": "#313244",
      "editor.selectionBackground": "#45475a",
      "editor.inactiveSelectionBackground": "#45475a80",
      "editorCursor.foreground": "#f5e0dc",
      "editorLineNumber.foreground": "#6c7086",
      "editorLineNumber.activeForeground": "#cdd6f4",
      "editor.selectionHighlightBackground": "#585b7080",
      "editorBracketMatch.background": "#585b70",
      "editorBracketMatch.border": "#6c7086",
      "editorGutter.background": "#1e1e2e",
      "editorWidget.background": "#313244",
      "editorWidget.border": "#45475a",
      "input.background": "#45475a",
      "input.foreground": "#cdd6f4",
      "input.border": "#585b70",
      "focusBorder": "#89b4fa",
      "list.activeSelectionBackground": "#45475a",
      "list.hoverBackground": "#313244",
      "scrollbarSlider.background": "#45475a",
      "scrollbarSlider.hoverBackground": "#585b70",
      "scrollbarSlider.activeBackground": "#6c7086",
    },
  },
  tokyonight: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "565f89", fontStyle: "italic" },
      { token: "keyword", foreground: "bb9af7" },
      { token: "string", foreground: "9ece6a" },
      { token: "number", foreground: "ff9e64" },
      { token: "type", foreground: "7dcfff" },
      { token: "function", foreground: "7aa2f7" },
      { token: "variable", foreground: "c0caf5" },
      { token: "constant", foreground: "ff9e64" },
      { token: "operator", foreground: "89ddff" },
    ],
    colors: {
      "editor.background": "#1a1b26",
      "editor.foreground": "#c0caf5",
      "editor.lineHighlightBackground": "#24283b",
      "editor.selectionBackground": "#364a82",
      "editor.inactiveSelectionBackground": "#364a8280",
      "editorCursor.foreground": "#c0caf5",
      "editorLineNumber.foreground": "#565f89",
      "editorLineNumber.activeForeground": "#c0caf5",
      "editor.selectionHighlightBackground": "#364a8280",
      "editorBracketMatch.background": "#364a82",
      "editorBracketMatch.border": "#565f89",
      "editorGutter.background": "#1a1b26",
      "editorWidget.background": "#24283b",
      "editorWidget.border": "#364a82",
      "input.background": "#24283b",
      "input.foreground": "#c0caf5",
      "input.border": "#364a82",
      "focusBorder": "#7aa2f7",
      "list.activeSelectionBackground": "#364a82",
      "list.hoverBackground": "#24283b",
      "scrollbarSlider.background": "#364a82",
      "scrollbarSlider.hoverBackground": "#3b4261",
      "scrollbarSlider.activeBackground": "#565f89",
    },
  },
  gruvbox: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "928374", fontStyle: "italic" },
      { token: "keyword", foreground: "d3869b" },
      { token: "string", foreground: "b8bb26" },
      { token: "number", foreground: "fabd2f" },
      { token: "type", foreground: "8ec07c" },
      { token: "function", foreground: "83a598" },
      { token: "variable", foreground: "ebdbb2" },
      { token: "constant", foreground: "fabd2f" },
      { token: "operator", foreground: "83a598" },
    ],
    colors: {
      "editor.background": "#282828",
      "editor.foreground": "#ebdbb2",
      "editor.lineHighlightBackground": "#3c3836",
      "editor.selectionBackground": "#504945",
      "editor.inactiveSelectionBackground": "#50494580",
      "editorCursor.foreground": "#ebdbb2",
      "editorLineNumber.foreground": "#928374",
      "editorLineNumber.activeForeground": "#ebdbb2",
      "editor.selectionHighlightBackground": "#50494580",
      "editorBracketMatch.background": "#504945",
      "editorBracketMatch.border": "#928374",
      "editorGutter.background": "#282828",
      "editorWidget.background": "#3c3836",
      "editorWidget.border": "#504945",
      "input.background": "#3c3836",
      "input.foreground": "#ebdbb2",
      "input.border": "#504945",
      "focusBorder": "#83a598",
      "list.activeSelectionBackground": "#504945",
      "list.hoverBackground": "#3c3836",
      "scrollbarSlider.background": "#504945",
      "scrollbarSlider.hoverBackground": "#665c54",
      "scrollbarSlider.activeBackground": "#928374",
    },
  },
  nord: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "616e88", fontStyle: "italic" },
      { token: "keyword", foreground: "b48ead" },
      { token: "string", foreground: "a3be8c" },
      { token: "number", foreground: "d08770" },
      { token: "type", foreground: "8fbcbb" },
      { token: "function", foreground: "88c0d0" },
      { token: "variable", foreground: "d8dee9" },
      { token: "constant", foreground: "d08770" },
      { token: "operator", foreground: "81a1c1" },
    ],
    colors: {
      "editor.background": "#2e3440",
      "editor.foreground": "#d8dee9",
      "editor.lineHighlightBackground": "#3b4252",
      "editor.selectionBackground": "#434c5e",
      "editor.inactiveSelectionBackground": "#434c5e80",
      "editorCursor.foreground": "#d8dee9",
      "editorLineNumber.foreground": "#616e88",
      "editorLineNumber.activeForeground": "#d8dee9",
      "editor.selectionHighlightBackground": "#434c5e80",
      "editorBracketMatch.background": "#434c5e",
      "editorBracketMatch.border": "#616e88",
      "editorGutter.background": "#2e3440",
      "editorWidget.background": "#3b4252",
      "editorWidget.border": "#434c5e",
      "input.background": "#3b4252",
      "input.foreground": "#d8dee9",
      "input.border": "#434c5e",
      "focusBorder": "#88c0d0",
      "list.activeSelectionBackground": "#434c5e",
      "list.hoverBackground": "#3b4252",
      "scrollbarSlider.background": "#434c5e",
      "scrollbarSlider.hoverBackground": "#4c566a",
      "scrollbarSlider.activeBackground": "#616e88",
    },
  },
  dracula: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4", fontStyle: "italic" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "string", foreground: "50fa7b" },
      { token: "number", foreground: "f1fa8c" },
      { token: "type", foreground: "8be9fd" },
      { token: "function", foreground: "bd93f9" },
      { token: "variable", foreground: "f8f8f2" },
      { token: "constant", foreground: "f1fa8c" },
      { token: "operator", foreground: "ffb86c" },
    ],
    colors: {
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#44475a",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a80",
      "editorCursor.foreground": "#f8f8f2",
      "editorLineNumber.foreground": "#6272a4",
      "editorLineNumber.activeForeground": "#f8f8f2",
      "editor.selectionHighlightBackground": "#44475a80",
      "editorBracketMatch.background": "#44475a",
      "editorBracketMatch.border": "#6272a4",
      "editorGutter.background": "#282a36",
      "editorWidget.background": "#44475a",
      "editorWidget.border": "#44475a",
      "input.background": "#44475a",
      "input.foreground": "#f8f8f2",
      "input.border": "#6272a4",
      "focusBorder": "#bd93f9",
      "list.activeSelectionBackground": "#44475a",
      "list.hoverBackground": "#44475a",
      "scrollbarSlider.background": "#44475a",
      "scrollbarSlider.hoverBackground": "#565b7a",
      "scrollbarSlider.activeBackground": "#6272a4",
    },
  },
};

export type Snippet = {
  id: string;
  label: string;
  description: string;
  code: string;
  icon?: string;
};

export const SNIPPETS: Snippet[] = [
  {
    id: "hello",
    label: "Hello World",
    description: "Basic console output",
    code: `// Welcome to the playground
console.log("Hello from pratap's playground!");
console.log("Write any JavaScript and hit Run");

const answer = 42;
console.log("The answer is:", answer);

// Try editing this code
`,
  },
  {
    id: "arrays",
    label: "Array Methods",
    description: "Map, filter, reduce examples",
    code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const even = numbers.filter(n => n % 2 === 0);
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((a, b) => a + b, 0);

console.log("Original:", numbers);
console.log("Even:", even);
console.log("Doubled:", doubled);
console.log("Sum:", sum);

// Chaining
const result = numbers
  .filter(n => n > 3)
  .map(n => n * 3)
  .reduce((a, b) => a + b, 0);

console.log("Chained result:", result);
`,
  },
  {
    id: "async",
    label: "Async/Await",
    description: "Promise-based async patterns",
    code: `const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function countdown() {
  console.log("Starting countdown...");
  
  for (let i = 5; i > 0; i--) {
    console.log(i);
    await delay(500);
  }
  
  console.log("🚀 Go!");
  return "Complete";
}

countdown().then(result => {
  console.log("Result:", result);
});
`,
  },
  {
    id: "event-loop",
    label: "Event Loop",
    description: "Microtasks vs macrotasks",
    code: `console.log("1: Start");

setTimeout(() => console.log("2: Timeout (macrotask)"), 0);
setTimeout(() => console.log("3: Timeout (100ms)"), 100);

Promise.resolve().then(() => console.log("4: Promise (microtask)"));
Promise.resolve().then(() => console.log("5: Promise (microtask)"));

queueMicrotask(() => console.log("6: queueMicrotask"));

console.log("7: End");

// Expected order: 1, 7, 4, 5, 6, 2, 3
`,
  },
  {
    id: "fibonacci",
    label: "Fibonacci",
    description: "Recursive algorithm demo",
    code: `// Recursive Fibonacci with memoization
const memo = new Map();

function fib(n) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  
  const result = fib(n - 1) + fib(n - 2);
  memo.set(n, result);
  return result;
}

console.log("Fibonacci sequence:");
for (let i = 0; i <= 15; i++) {
  console.log(\`fib(\${i}) = \${fib(i)}\`);
}

console.log("\\nCache hits:", memo.size);
`,
  },
  {
    id: "generators",
    label: "Generators",
    description: "Generator functions and iteration",
    code: `function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

console.log("First 10 Fibonacci numbers:");
const gen = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(\`  \${i + 1}: \${gen.next().value}\`);
}

// Custom iterator
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const end = this.to;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      },
    };
  },
};

console.log("\\nRange iterator:");
for (const n of range) {
  console.log("  ", n);
}
`,
  },
  {
    id: "closures",
    label: "Closures",
    description: "Closure and scope examples",
    code: `// Counter factory
function createCounter(initial = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = initial),
    value: () => count,
  };
}

const counter = createCounter(10);
console.log("Initial:", counter.value());
console.log("Increment:", counter.increment());
console.log("Increment:", counter.increment());
console.log("Decrement:", counter.decrement());
console.log("Reset:", counter.reset());
console.log("After reset:", counter.value());

// Private state
function createStack() {
  const items = [];
  return {
    push: (item) => items.push(item),
    pop: () => items.pop(),
    peek: () => items[items.length - 1],
    get size() { return items.length; },
  };
}

const stack = createStack();
stack.push("a");
stack.push("b");
stack.push("c");
console.log("\\nStack:", stack.peek(), stack.size);
`,
  },
  {
    id: "objects",
    label: "Object Manipulation",
    description: "Object methods and spreading",
    code: `// Object operations
const user = {
  name: "Pratap",
  role: "Software Engineer",
  skills: ["Go", "TypeScript", "Python"],
};

console.log("User:", user);
console.log("Keys:", Object.keys(user));
console.log("Values:", Object.values(user));
console.log("Entries:", Object.entries(user));

// Destructuring
const { name, role } = user;
console.log("\\nDestructured:", name, role);

// Spread
const extended = {
  ...user,
  location: "India",
  skills: [...user.skills, "Docker"],
};
console.log("\\nExtended:", extended);

// Optional chaining
const data = { a: { b: { c: 42 } } };
console.log("\\nNested access:", data?.a?.b?.c);
console.log("Safe access:", data?.x?.y ?? "default");
`,
  },
  {
    id: "classes",
    label: "ES6 Classes",
    description: "Class syntax and inheritance",
    code: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
  
  static classify() {
    return "Animalia";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks!\`;
  }
  
  fetch() {
    return \`\${this.name} fetches the ball\`;
  }
}

const animals = [
  new Animal("Generic"),
  new Dog("Cooper", "Golden Retriever"),
  new Dog("Luna", "Husky"),
];

animals.forEach(a => console.log(a.speak()));
console.log("\\nClassification:", Animal.classify());
`,
  },
  {
    id: "destructuring",
    label: "Destructuring",
    description: "Array and object destructuring",
    code: `// Array destructuring
const colors = ["red", "green", "blue", "yellow", "purple"];
const [primary, secondary, ...rest] = colors;

console.log("Primary:", primary);
console.log("Secondary:", secondary);
console.log("Rest:", rest);

// Swapping variables
let a = 10, b = 20;
[a, b] = [b, a];
console.log("\\nSwapped:", { a, b });

// Nested destructuring
const person = {
  name: "Pratap",
  address: {
    city: "India",
    coordinates: { lat: 20.59, lng: 78.96 },
  },
};

const {
  name: userName,
  address: { city, coordinates: { lat, lng } },
} = person;

console.log("\\nNested:", { userName, city, lat, lng });

// Function params destructuring
function greet({ name, role }) {
  return \`Hello, \${name}! You are a \${role}.\`;
}

console.log("\\n", greet(person));
`,
  },
];
