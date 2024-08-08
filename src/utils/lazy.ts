const lazyMap: { [key: string]: unknown } = {};

export const lazy = async (func: () => Promise<unknown>) => {
  const match = func.toString().match(/import\(["'](.+?)["']\)/);
  const path = match ? match[1] : null;
  if (path && !lazyMap[path]) {
    lazyMap[path] = await func();
  }
};
