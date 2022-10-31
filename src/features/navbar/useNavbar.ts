import { useEffect, useState } from "react";
import $ from "jquery";

export const useNavbar = () => {
  const [isSearch, setSearch] = useState<boolean>(false);

  useEffect(() => {
    /*const $win = $(window);
        const $app = $("#app");
        const $head = $(".warcraft");
        const $nav = $(".nav");
        const $burger = $(".nav__burger, .nav__close");
        const $overlay = $(".overlay");
        const $search_icon = $(".nav__item--search");
        const $switch = $(".switch");
        const top = parseInt(
          getComputedStyle($nav.get(0))
            .getPropertyValue("--header-top")
            .replace("px", "")
        );

        const apply = () => {
          if ($win.scrollTop() >= top) {
            $head.addClass("fixed");
          } else {
            $head.removeClass("fixed");
          }
        };

        $win.on("scroll", apply);
        apply();

        $search_icon.on("click", () => {
          $head.toggleClass("searching");
        });

        $burger.on("click", () => {
          $head.toggleClass("open");
        });

        $overlay.on("click", () => {
          $head.removeClass("open");
        });

        $switch.on("change", "input", (e) => {
          const style = $(e.currentTarget).val();
          $app.removeClass("classic wolk tbc mop").addClass(style);
        });*/
  });

  return { isSearch, setSearch };
};
