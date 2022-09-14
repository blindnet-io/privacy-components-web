const viewports = {};
Array.from(new Array(10)).map((_, i) => {
  const w = 350 + i * 100;
  viewports['w' + w] = {
    type: 'desktop',
    name: w + 'px',
    styles: {
      width: w + 'px',
      height: '90%',
    },
  };
});

export const parameters = {
  viewMode: 'docs',
  viewport: { viewports },
};
