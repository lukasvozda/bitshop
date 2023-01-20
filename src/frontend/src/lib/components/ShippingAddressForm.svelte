<script>
   import { form, field } from 'svelte-forms';
   import { required, email } from 'svelte-forms/validators';
   import CountryStateCityDropdown from './CountryStateCityDropdown.svelte';
   import { mail, firstName, lastName, postCode, street } from '../../stores/shoppingCart/index.ts';

   const formMail = field('mail', null, [email()]);
   const formFirstName = field('firstName', null, [required()]);
   const formLastName = field('lastName', null, [required()]);
   const formPostCode = field('postCode', null, [required()]);
   const formStreet = field('street', null, [required()]);
   const addressForm = form(formMail, formFirstName, formLastName, formPostCode, formStreet);

   $: mail.set($formMail);
   $: firstName.set($formFirstName);
   $: lastName.set($formLastName);
   $: postCode.set($formPostCode);
   $: street.set($formStreet);

   const isValidField = (invalid) =>
      invalid
         ? 'invalid:border-red-500 invalid:text-red-500 focus:invalid:border-red-500 focus:invalid:text-red-500 focus:invalid:ring-red-500'
         : '';
</script>

<section>
   <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
         <div class="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
               <div class="overflow-hidden shadow rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                     <div class="grid grid-cols-12 gap-8">
                        <div class="col-span-6 sm:col-span-6">
                           <label for="first-name" class="block text-sm font-medium text-gray-700"
                              >First name*</label
                           >
                           <input
                              placeholder="Your first name"
                              bind:value={$formFirstName.value}
                              type="text"
                              required
                              name="first-name"
                              id="first-name"
                              autocomplete="given-name"
                              class="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                                 $addressForm.hasError('firstName.required')
                              )}"
                           />
                           {#if $addressForm.hasError('firstName.required')}
                              <span class="text-red-500 text-sm ml-1 mt-1"> First name is required </span>
                           {/if}
                        </div>

                        <div class="col-span-6 sm:col-span-6">
                           <label for="last-name" class="block text-sm font-medium text-gray-700"
                              >Last name*</label
                           >
                           <input
                              required
                              placeholder="Your last name"
                              bind:value={$formLastName.value}
                              type="text"
                              name="last-name"
                              id="last-name"
                              autocomplete="family-name"
                              class="text-gray-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                                 $addressForm.hasError('lastName.required')
                              )}"
                           />
                           {#if $addressForm.hasError('lastName.required')}
                              <span class="text-red-500 text-sm ml-1 mt-1"> Last name is required </span>
                           {/if}
                        </div>

                        <div class="col-span-6 sm:col-span-6">
                           <label for="email-address" class="block text-sm font-medium text-gray-700"
                              >Email address*</label
                           >
                           <input
                              placeholder="Your email address"
                              bind:value={$formMail.value}
                              required
                              type="email"
                              name="email-address"
                              id="email-address"
                              autocomplete="email"
                              class="peer mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                                 $addressForm.hasError('mail.not_an_email')
                              )}"
                           />
                           {#if $addressForm.hasError('mail.not_an_email')}
                              <span class="text-red-500 text-sm ml-1 mt-1">
                                 Does not match standard email format
                              </span>
                           {/if}
                        </div>
                        <div class="col-span-12">
                           <CountryStateCityDropdown />
                        </div>

                        <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                           <label for="postal-code" class="block text-sm font-medium text-gray-700"
                              >ZIP / Postal code*</label
                           >
                           <input
                              type="text"
                              bind:value={$formPostCode.value}
                              required
                              name="postal-code"
                              id="postal-code"
                              autocomplete="postal-code"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                                 $addressForm.hasError('postCode.required')
                              )}"
                           />
                           {#if $addressForm.hasError('postCode.required')}
                              <span class="text-red-500 text-sm ml-1 mt-1"> Post code is required </span>
                           {/if}
                        </div>

                        <div class="col-span-6">
                           <label for="street-address" class="block text-sm font-medium text-gray-700"
                              >Street address*</label
                           >
                           <input
                              type="text"
                              required
                              bind:value={$formStreet.value}
                              name="street-address"
                              id="street-address"
                              autocomplete="street-address"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {isValidField(
                                 $addressForm.hasError('street.required')
                              )}"
                           />
                           {#if $addressForm.hasError('street.required')}
                              <span class="text-red-500 text-sm ml-1 mt-1"> Street address is required </span>
                           {/if}
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
</section>
