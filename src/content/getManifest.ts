import { manifest } from "../../content/bsb50420/manifest";
import faqData from "../data/faq.json";

export function getManifest() {
    return {
        ...manifest,
        faq: faqData
    };
}
