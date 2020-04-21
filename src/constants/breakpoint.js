const name = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge'
  };
  
  const value = {
    [name.XLARGE]: 1200,
    [name.LARGE]: 900,
    [name.MEDIUM]: 600,
    [name.SMALL]: 0
  };
  
  const formatted = [
    {
      name: name.SMALL,
      media: `(min-width: ${value[name.SMALL]}px)`
    },
    {
      name: name.MEDIUM,
      media: `(min-width: ${value[name.MEDIUM]}px)`
    },
    {
      name: name.LARGE,
      media: `(min-width: ${value[name.LARGE]}px)`
    },
    {
      name: name.XLARGE,
      media: `(min-width: ${value[name.XLARGE]}px)`
    }
  ];
  
  export default {
    name,
    value,
    formatted
  };