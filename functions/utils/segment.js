const segment = require("analytics-node");

const Segment = new segment(process.env.REACT_APP_SEGMENT_KEY);

module.exports = Segment;