# Echarts Options

<img alt="npm" src="https://img.shields.io/npm/v/@jxav22/echarts-options">
A simple library for creating the options object for an `echarts-for-react` (https://www.npmjs.com/package/echarts-for-react) component.

### Features:

- Enables autocomplete/checking with IntelliSense\*, eradicating typo related errors.
- Extremely lightweight. Only 254 lines of code, zero dependancies.
- Fast and flexible. Removing it from a graph is simple, just replace it with the exported options object.
- Can build the options object in a modular and reusable way.

_\*IntelliSense is only available for key fields, this excludes most of the fields used for styling._

## Install

```
$ npm install @jxav22/echarts-options
```

## Usage

### Creating the options object

```
import EchartsOptions from "@jxav22/echarts-options";

const g = new EchartsOptions();
```

### Editing fields

Use dot notation to edit fields

```
g.title.text = "Hello world!";
g.title.subtext = ";)";
```

Currently supported fields

```
title
grid
legend
yAxis
xAxis
axisPointer
series
```

Use the add method to add fields that are not supported

```
g.add({
  dataset : {
     dimensions: ["headers", "for", "each", "column"],
     source: [1, 2, 3, 4],
  }
});

// can be used at different levels
g.yAxis.add({
  axisTick: {
    show: false,
  },
});
```

You can additionally use dot notation to add fields, but the field type must be in `ALLOWED_DATA_TYPES`

```
const ALLOWED_DATA_TYPES = ["string", "number", "boolean"];
```

```
// allowed
g.title.field = true;

// not allowed, arrays are not supported
g.title.field = ["array", "of", "strings"]

// instead use add
g.title.add({
    field: ["array", "of", "strings"]
})
```

### Global defaults

You can set global defaults in any of the classes that extend `Options`

```
class AxisPointerOptions extends Options {
  show = true;
  ...
}
```

### Custom methods

You can add custom methods to any of the classes that extend `Options`

```
class TitleOptions extends Options {
  text;
  ...
  /**
   * Extend the title text horizontally, by applying padding to each side
   * @param {number} amountOfPadding The amount of padding to apply, to each side,
   *  where each unit is one space " ".
   */
  extendHorizontally(amountOfPadding) {
    let padding = "";
    for (var i = 0; i < amountOfPadding; i++) {
      padding = padding.concat(" ");
    }
    this.text = `${padding}${this.text}${padding}`;
  }
}
```

Usage

```
g.title.extendHorizontally(20);
```

### Adding graphs to the series field

```
import { GraphOptions } from "@jxav22/echarts-options";
```

```
const barGraph = new GraphOptions("bar", "A Bar Graph");
barGraph.add({
   // edit fields here
});

const pieGraph = new GraphOptions("pie", "A Pie Graph");
pieGraph.add({
  // edit fields here
});

g.series.setData([barGraph, pieGraph]);
```

### Exporting the options object

```
<ReactEcharts option={g.export()}/>
```
