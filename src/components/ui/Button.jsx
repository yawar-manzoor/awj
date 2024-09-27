/* eslint-disable react/prop-types */

import { useTranslation } from "react-i18next";

const Button = ({
  translationKey,
  className,
  icon: IconComponent,
  children,
  // icon,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <button className={className} {...props}>
      {t(translationKey)}
      {children}
    </button>
  );
};

export default Button;
