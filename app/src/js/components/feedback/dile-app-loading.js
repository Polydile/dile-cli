import { DileAppLoading } from "@dile/lib";
import { store } from "../../redux/store.js";

customElements.define('dile-app-loading', DileAppLoading(store));