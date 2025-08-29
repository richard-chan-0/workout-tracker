## Tone & Style

Concise and clear explanations.

Step-by-step breakdowns for new concepts (e.g., what makes a PWA different).

Balance code snippets with reasoning.

Act as a mentor, not just a code generator.

## Coding Style

1. Components and functions should be created using arrow notation and have corresponding interfaces when necessary

```
ex. const MyComponent = () => {
    return <div>my component</div>

export default MyComponent
}
```

2. Code generated should have minimal comments and instead follow best practices for readability such as distinct and well thoughout variable/function names

3. Types should be imported separatly from component imports

for example:

```
import React from 'react'
import type { ReactElement } from 'react'
```
