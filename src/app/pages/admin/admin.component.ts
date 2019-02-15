import { Component } from "@angular/core";
import { faTh, faListUl, faUsers } from "@fortawesome/free-solid-svg-icons";

import { Link } from "./../../components/menu/link";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  public links: Link[] = [
    {
      icon: faUsers,
      label: "Användare",
      route: "/admin/users"
    },
    {
      icon: faTh,
      label: "Produkter",
      route: "/admin/products"
    },
    // {
    //   icon: faListUl,
    //   label: "Historik",
    //   route: "/admin/history"
    // }
  ];

  constructor() { }

}
