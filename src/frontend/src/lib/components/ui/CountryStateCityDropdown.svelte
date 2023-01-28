<script>
  //import { Country, State, City } from "country-state-city";
  import { field } from "svelte-forms";
  import { mustBeInList, mustHaveSpecifiedName } from "@/lib/utils/validators/index.ts";
  import { city, country, county } from "@/stores/cart/index.ts";
  import AutoCompleteInput from "@/lib/components/ui/AutoCompleteInput.svelte";

  const filterItems = (input, item) => item.name.toLowerCase().startsWith(input.name.toLowerCase());
  const equalItems = (input, item) => item.name.toLowerCase() === input.name.toLowerCase();

  let countries = Country.getAllCountries().map((country) => ({
    name: country.name,
    isoCode: country.isoCode,
    flag: country.flag
  }));

  let regions = [];

  let formCountry = field("fieldItem", {}, [mustBeInList(countries), mustHaveSpecifiedName()]);
  let formRegion = field("fieldItem", {}, []);
  let formCity = field("fieldItem", {}, [mustHaveSpecifiedName()]);

  $: country.set($formCountry);
  $: county.set($formRegion);
  $: city.set($formCity);

  const getCountryRegions = (country) => {
    if (country.valid) {
      return State.getStatesOfCountry(country.value.isoCode).map((state) => ({
        name: state.name,
        isoCode: state.isoCode
      }));
    } else {
      return [];
    }
  };

  const getCities = (country, region) => {
    if (country.valid) {
      if (region.valid && region.isoCode) {
        return City.getCitiesOfState(country.value.isoCode, region.value.isoCode).map((city) => ({
          name: city.name
        }));
      } else {
        return City.getCitiesOfCountry(country.value.isoCode).map((city) => ({
          name: city.name
        }));
      }
    }
    return [];
  };

  $: regions = getCountryRegions($formCountry);
  $: cities = getCities($formCountry, $formRegion);
</script>

<div class="grid gap-8">
  <div class="col-span-4 sm:col-span-3">
    <span class="block text-sm font-medium text-gray-700">Country*</span>
    <AutoCompleteInput
      items={countries}
      filterMethod={filterItems}
      equalMethod={equalItems}
      placeholder="Start typing the name of your country"
      let:item
      fieldItem={formCountry}
    >
      {#if item}
        <span>
          <span class="m2-1">{item.flag}</span>
          <span class="text-sm">{item.name}</span>
        </span>
      {/if}
    </AutoCompleteInput>
  </div>
  <div class="col-span-4 sm:col-span-3">
    <span class="block text-sm font-medium text-gray-700">State / Province / Region</span>
    <AutoCompleteInput
      items={regions}
      filterMethod={filterItems}
      placeholder="Start typing the name of your region"
      disabled={$formCountry.invalid || !$formCountry.dirty}
      let:item
      fieldItem={formRegion}
    >
      {#if item}
        <span class="text-sm">{item.name}</span>
      {/if}
    </AutoCompleteInput>
  </div>
  <div class="col-span-4 sm:col-span-3">
    <span class="block text-sm font-medium text-gray-700">City*</span>
    <AutoCompleteInput
      items={cities}
      filterMethod={filterItems}
      placeholder="Start typing the name of your city"
      disabled={$formCountry.invalid || !$formCountry.dirty}
      let:item
      fieldItem={formCity}
    >
      {#if item}
        <span class="text-sm">{item.name}</span>
      {/if}
    </AutoCompleteInput>
  </div>
</div>
