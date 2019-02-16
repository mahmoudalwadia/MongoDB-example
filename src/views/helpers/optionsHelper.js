module.exports = (options) => options.map((ops) => `${ops.title} (${ops.counts})`).join(', ');
