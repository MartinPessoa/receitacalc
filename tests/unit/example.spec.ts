import { mount } from "@vue/test-utils";
import IngredientesPage from "@/views/IngredientesPage.vue";

describe("IngredientesPage.vue", () => {
  it("renders tab 1 Tab1Page", () => {
    const wrapper = mount(IngredientesPage);
    expect(wrapper.text()).toMatch("Tab 1 page");
  });
});
