import { forwardRef } from "react";
import { Link, NavLink } from "react-router-dom";
import type { buttonKind, buttonTypes } from "../types/buttonTypes";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  comp: buttonKind;
  buttonType: buttonTypes;
  children: ReactNode;
  more?: string;
  navigation?: string;
  end?: boolean;
}

// تعریف تایپ ref برای پشتیبانی همزمان از Button و Anchor (لینک)
type ButtonOrAnchorRef = HTMLButtonElement | HTMLAnchorElement;

const Buttons = forwardRef<ButtonOrAnchorRef, ButtonProps>(
  (
    {
      comp,
      buttonType: variant,
      children,
      more: classes,
      navigation,
      end,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = {
      primary: "primary-button",
      neutral: "neutral-button",
      success: "success-button",
      danger: "danger-button",
      loading: "button-not-selected",
      submit: "primary-button",
      regular: "",
      HomePageLink: "HomePage-Link",
      backTo: "backTo-link",
      buttomNavLink: "nav-mobile-btn-notSelected",
      sideNavlink: "nav-btn-notSelected",
    };

    const combinedClasses =
      `${buttonClasses[variant]} ${classes ?? ""} focus:ring-[3px] focus:ring-blue-600/[0.28] focus:outline-none focus:ring-offset-2`.trim();

    if (comp === "link") {
      return (
        <Link
          to={navigation ?? ""}
          className={combinedClasses}
          ref={ref as Ref<HTMLAnchorElement>} // تنظیم نوع ref برای لینک
          {...(props as unknown as Omit<
            React.ComponentProps<typeof Link>,
            "to"
          >)}
        >
          {children}
        </Link>
      );
    }

    if (comp === "navLink") {
      return (
        <NavLink
          end={end}
          to={navigation ?? ""}
          className={combinedClasses}
          ref={ref as Ref<HTMLAnchorElement>}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        >
          {children}
        </NavLink>
      );
    }

    return (
      <button
        className={combinedClasses}
        ref={ref as Ref<HTMLButtonElement>} // تنظیم نوع ref برای دکمه
        {...props}
      >
        {children}
      </button>
    );
  },
);

// اختصاص نام برای دیباگ بهتر در React DevTools
Buttons.displayName = "Buttons";

export default Buttons;
