const ALLOWED_DATA_TYPES = ["string", "number", "boolean"];

class Options {
  #options = {};

  export() {
    return { ...this.options, ...this.#options };
  }

  add(optionsToAdd) {
    this.#options = { ...this.#options, ...optionsToAdd };
  }

  get options() {
    const options = {};

    const keys = Object.keys(this);
    keys
      .filter((key) => {
        const valueType = typeof this[key];

        return ALLOWED_DATA_TYPES.some((DATA_TYPE) => valueType === DATA_TYPE);
      })
      .forEach((key) => (options[key] = this[key]));

    return options;
  }
}

class TitleOptions extends Options {
  show;
  zlevel;

  text;
  subtext;

  // styling
  backgroundColor;

  // shadow
  shadowColor;
  shadowBlur;
  shadowOffsetX;
  shadowOffsetY;

  // border
  borderColor;
  borderWidth;
  borderRadius;

  // spacing
  textAlign;
  textVerticalAlign;

  padding;
  itemGap;

  // poisitioning
  top;
  left;
  bottom;
  right;

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

class LegendOptions extends Options {
  show;
  zlevel;
  type;

  selectedMode;

  // styling
  icon;
  inactiveColor;
  inactiveBorderColor;
  inactiveBorderWidth;
  backgroundColor;

  // shadow
  shadowBlur;
  shadowColor;
  shadowOffsetX;
  shadowOffsetY;

  // border
  borderColor;
  borderWidth;
  borderRadius; // can use arrays, which is not supported

  // orientation
  orient;
  align;
  symbolRotate;

  // spacing
  padding;
  itemGap;
  itemWidth;
  itemHeight;

  // sizing
  width;
  height;

  // positioning
  top;
  left;
  bottom;
  right;
}

class GridOptions extends Options {
  show;
  zlevel;

  containLabel;

  // styling
  backgroundColor;

  // border
  borderWidth;
  borderColor;

  // shadow
  shadowBlur;
  shadowColor;
  shadowOffsetX;
  shadowOffsetY;

  // sizing
  width;
  height;

  // positioning
  top;
  left;
  bottom;
  right;
}

class AxisOptions extends Options {
  show;
  zlevel;
  type;

  scale; // requires (type === 'value') && (min and max not set)
  alignTicks;
  inverse;
  silent;

  // Intervals
  min; // can use funcitions, which are not supported
  max; // can use funcitions, which are not supported
  splitNumber;
  minInterval; // requries (type === 'value') || (type === 'time')
  maxInterval; // requries (type === 'value') || (type === 'time')
  interval;
  logBase; // requires (type === 'log');

  // naming
  name;
  nameLocation;
  nameGap;
  nameRotate;

  // positioning => requires (xAxis.axisLine.onZero === false)
  position;
  offset;
}

class AxisPointerOptions extends Options {
  show;
  zlevel;
  type;

  value;
  status;

  snap;

  // Triggers
  triggerOn;
  triggerTooltip;
}

class GraphOptions extends Options {
  zlevel;
  type;

  name;
  seriesLayoutBy;

  /**
   * @param {string} type The type of graph e.g "bar"
   * @param {string} name Series name used for displaying in tooltip and filtering with legend, or updating data and configuration with setOption.
   */
  constructor(type, name) {
    super();
    this.type = type;
    this.name = name;
  }
}

class SeriesOptions extends Options {
  backgroundColor;

  #data = [];
  /**
   * @param {Array.<GraphOptions>} data An array of GraphOptions objects, each one representing a graph.
   */
  setData(data) {
    this.#data = data;
  }

  export() {
    return this.#data.map((data) => data.export());
  }
}

class EchartsOptions extends Options {
  title = new TitleOptions();
  grid = new GridOptions();
  legend = new LegendOptions();
  yAxis = new AxisOptions();
  xAxis = new AxisOptions();
  axisPointer = new AxisPointerOptions();

  series = new SeriesOptions();

  export = () => {
    const options = super.export();
    return {
      grid: this.grid.export(),
      title: this.title.export(),
      legend: this.legend.export(),
      yAxis: this.yAxis.export(),
      xAxis: this.xAxis.export(),
      axisPointer: this.axisPointer.export(),
      series: this.series.export(),
      ...options,
    };
  };
}

export { GraphOptions };
export default EchartsOptions;
