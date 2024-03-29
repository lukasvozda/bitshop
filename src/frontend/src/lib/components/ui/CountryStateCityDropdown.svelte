<script>
  import { getData } from "country-list";
  import { field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import { mustBeInList, mustHaveSpecifiedName } from "@/lib/utils/validators";
  import { city, country, county } from "@/stores/cart";
  import AutoCompleteInput from "@/lib/components/ui/AutoCompleteInput.svelte";
  import { countryCodeEmoji } from "country-code-emoji";

  const filterItems = (input, item) => item.name.toLowerCase().startsWith(input.name.toLowerCase());
  const equalItems = (input, item) => item.name.toLowerCase() === input.name.toLowerCase();

  let countries = getData().map((country) => ({
    name: country.name,
    isoCode: country.isoCode,
    flag: countryCodeEmoji(country.code)
  }));

  const initializeCountry = () => {
    if ($country?.value) {
      return countries.find((c) => c.name === $country.value.name) || {};
    } else {
      return {};
    }
  };

  let formCountry = field("fieldItem", initializeCountry(), [
    mustBeInList(countries),
    mustHaveSpecifiedName()
  ]);
  let formRegion = field("fieldItem", $county?.value, []);
  let formCity = field("fieldItem", $city?.value, []);

  $: country.set($formCountry);
  $: county.set($formRegion);
  $: city.set($formCity);
</script>

<div class="grid grid-cols-12 gap-y-8 sm:gap-8">
  <div class="col-span-12 sm:col-span-6">
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
        <div class="flex align-middle">
          <div class="mr-2">{item.flag}</div>
          <div class="text-sm">{item.name}</div>
        </div>
      {/if}
    </AutoCompleteInput>
  </div>
  <div class="col-span-12 sm:col-span-6">
    <span class="block text-sm font-medium text-gray-700">State / Province / Region</span>
    <input
      tabindex="0"
      type="text"
      disabled={$formCountry.invalid || !$formCountry.dirty}
      placeholder="Type in your state/region/province if necessary"
      bind:value={$formRegion.value}
      class="peer mt-1 block input-md w-full rounded-lg border border-gray-700 disabled:bg-gray-200 focus:text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
  <div class="col-span-12 sm:col-span-6">
    <span class="block text-sm font-medium text-gray-700">City*</span>
    <input
      tabindex="0"
      type="text"
      disabled={$formCountry.invalid || !$formCountry.dirty}
      placeholder="Type in your city"
      bind:value={$formCity.value}
      class="peer mt-1 block input-md w-full rounded-lg border border-gray-700 disabled:bg-gray-200 focus:text-gray-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {$formCity.invalid &&
      $formCity.dirty
        ? 'invalid:border-red-500 invalid:text-red-500'
        : ''}"
    />
    {#if $formCity.invalid && $formCity.dirty}
      <span class="text-red-500 text-sm ml-1 mt-1"> City name is required</span>
    {/if}
  </div>
</div>
