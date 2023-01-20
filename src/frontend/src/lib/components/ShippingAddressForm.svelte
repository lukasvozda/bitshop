<script>
  import { form, field } from 'svelte-forms';
  import { required, email } from 'svelte-forms/validators';
  import CountryDropdown from "./CountryDropdown.svelte";

  const mail = field('mail', '', [email()]);
  const firstName = field('firstName', '', [required()]);
  const lastName = field('lastName', '', [required()]);
  const street = field('street', '', [required()]);
  const city = field('city', '', [required()]);
  const postCode = field('postCode', '', [required()]);
  const country = field('country', '', [required()]);
  const county = field('county', '', []);
  const addressForm = form(mail, firstName, lastName, street, city, postCode, country, county);

  const isValidField = (invalid) => invalid ? 'invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500' : '';

</script>

<section>
<!--    <div class="form-control w-full">-->
<!--        &lt;!&ndash;{ $shippingAddressForm.errors }&ndash;&gt;-->
<!--        <label class="pb-4 mb-3 relative">-->
<!--            <input-->
<!--                type="text"-->
<!--                bind:value={$mail.value}-->
<!--                placeholder="email"-->
<!--                class="input input-bordered w-full mb-2 max-w-xl"-->
<!--                class:input-error="{$shippingAddressForm.hasError('mail.not_an_email')}"-->
<!--            />-->
<!--            {#if $shippingAddressForm.hasError('mail.not_an_email')}-->
<!--                <span class="text-red-500 text-sm block absolute bottom-0 ml-1">Required in correct format</span>-->
<!--            {/if}-->
<!--        </label>-->
<!--        <div class="flex flex-row justify-between max-w-xl">-->
<!--            <label class="pb-4 mb-3 mr-2 w-full relative">-->
<!--                <input-->
<!--                    type="text"-->
<!--                    bind:value={$firstName.value}-->
<!--                    placeholder="first name"-->
<!--                    class="input input-bordered w-full mb-2 max-w-xl"-->
<!--                    class:input-error="{$shippingAddressForm.hasError('firstName.required')}"-->
<!--                />-->
<!--                {#if $shippingAddressForm.hasError('firstName.required')}-->
<!--                    <span class="text-red-500 text-sm block absolute bottom-0 ml-1">First name is required</span>-->
<!--                {/if}-->
<!--            </label>-->
<!--            <label class="pb-4 mb-3 ml-2 w-full relative">-->
<!--                <input-->
<!--                    type="text"-->
<!--                    bind:value={$lastName.value}-->
<!--                    placeholder="last name"-->
<!--                    class="input input-bordered w-full mb-2 max-w-xl"-->
<!--                    class:input-error="{$shippingAddressForm.hasError('lastName.required')}"-->
<!--                />-->
<!--                {#if $shippingAddressForm.hasError('lastName.required')}-->
<!--                    <span class="text-red-500 text-sm block absolute bottom-0 ml-1">Last name is required</span>-->
<!--                {/if}-->
<!--            </label>-->
<!--        </div>-->
<!--        <CountryDropdown></CountryDropdown>-->
<!--    </div>-->


    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
                { $addressForm.errors }
                <form action="#" method="POST">
                    <div class="overflow-hidden shadow rounded-md">
                        <div class="bg-white px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                    <input
                                        placeholder="Your first name"
                                        bind:value={$firstName.value}
                                        type="text"
                                        required
                                        name="first-name"
                                        id="first-name"
                                        autocomplete="given-name"
                                        class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('firstName.required'))}"
                                    >
                                    {#if $addressForm.hasError('firstName.required')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            First name is required
                                        </span>
                                    {/if}
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                    <input
                                        required
                                        placeholder="Your last name"
                                        bind:value={$lastName.value}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autocomplete="family-name"
                                        class="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('lastName.required'))}"
                                    >
                                    {#if $addressForm.hasError('lastName.required')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            Last name is required
                                        </span>
                                    {/if}
                                </div>

                                <div class="col-span-6 sm:col-span-4">
                                    <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                                    <input
                                        placeholder="Your email address"
                                        bind:value={$mail.value}
                                        required
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        autocomplete="email"
                                        class="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('mail.not_an_email'))}"
                                    >
                                    {#if $addressForm.hasError('mail.not_an_email')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            Does not match standard email format
                                        </span>
                                    {/if}
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                    <CountryDropdown></CountryDropdown>
                                </div>

                                <div class="col-span-6">
                                    <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                                    <input
                                        type="text"
                                        required
                                        bind:value={$street.value}
                                        name="street-address"
                                        id="street-address"
                                        autocomplete="street-address"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('street.required'))}"
                                    >
                                    {#if $addressForm.hasError('street.required')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            Street address is required
                                        </span>
                                    {/if}
                                </div>

                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        required
                                        bind:value={$city.value}
                                        name="city"
                                        id="city"
                                        autocomplete="address-level2"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('city.required'))}"
                                    >
                                    {#if $addressForm.hasError('city.required')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            City name is required
                                        </span>
                                    {/if}
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                                    <input type="text" name="region" id="region" autocomplete="address-level1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                    <input
                                        type="text"
                                        bind:value={$postCode.value}
                                        required
                                        name="postal-code"
                                        id="postal-code"
                                        autocomplete="postal-code"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField($addressForm.hasError('postCode.required'))}"
                                    >
                                    {#if $addressForm.hasError('postCode.required')}
                                        <span class="text-red-500 text-sm ml-1 mt-1">
                                            Post code is required
                                        </span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</section>
