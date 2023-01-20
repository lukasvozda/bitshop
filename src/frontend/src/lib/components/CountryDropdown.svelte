<script>
    import AutoCompleteInput from "./AutoCompleteInput.svelte";
    import { Country, State, City }  from 'country-state-city';

    const filterCountries = (input, country) => country.name.toLowerCase().startsWith(input.name.toLowerCase());
    let countries = Country.getAllCountries().map((country) => {
      return {
        name: country.name, iso: country.isoCode, flag: country.flag
      }
    });
</script>

<div>
    <AutoCompleteInput
        items={countries}
        filterMethod={filterCountries}
        placeholder="Pick your country"
        let:item={item}
    >
        {#if item}
            <span>
                <span class="m2-1">{item.flag}</span>
                <span class="text-sm">{item.name}</span>
            </span>
        {/if}

    </AutoCompleteInput>
</div>

