import { getColors } from 'theme-colors';

interface ColorShadeOptions {
  [key: string]: string;
}

export const useColorShade = (options: ColorShadeOptions) => {
  const styles = computed(() => useCssVariables(options));
  useHead({
    style: [{ type: 'text/css', children: styles.value, hid: 'nuxt-theme' }],
  });
};

function useColors(colors: ColorShadeOptions) {
  try {
    return Object.entries(colors).map(([key, color]) => [
      key,
      typeof color === 'string' ? getColors(color) : color,
    ]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not parse custom colors:', e.message);
    return [];
  }
}

function useCssVariableStore(scopes = ['dark']) {
  scopes = ['default', ...scopes];
  // array to object map
  const _store = scopes.reduce((obj, scope) => ({ [scope]: {}, ...obj }), {});
  const getScope = (scope: string) => _store[scope] || null;
  const putSingle = (key: string) => (value: string) => {
    const _arr = value.split(':');
    const _value = _arr.pop();
    const _scope = getScope(_arr.pop() || 'default');
    if (_scope) {
      _scope[key] = _value;
    }
  };
  const put = (key: string, value: any) => {
    value.split(' ').map(putSingle(key));
  };
  const generateVar = ([key, value]) => `--${key}: ${value}`;
  const generateScope = (scope: string) => {
    const vars = Object.entries(getScope(scope)).map(generateVar).join(';');
    if (!vars) {
      return;
    }
    return scope === 'default' ? `:root {${vars}}` : `.${scope} {${vars}}`;
  };
  const generate = () => scopes.map(generateScope).join(' ');
  return { put, generate };
}

function useCssVariables(colors: ColorShadeOptions) {
  const { put, generate } = useCssVariableStore(['dark']);
  const colorsList = useColors(colors);
  colorsList.forEach(([color, map]) =>
    Object.entries(map).forEach(([variant, value]) =>
      put(`${color}-${variant}`, value)
    )
  );
  return generate();
}
