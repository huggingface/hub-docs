# Guide to Submitting a DMCA Notice on Hugging Face

This guide describes what Hugging Face needs in order to process a copyright takedown notice under the Digital Millennium Copyright Act (DMCA). It is incorporated into, and should be read alongside, our [Content Policy](https://huggingface.co/content-policy) and [Terms of Service](https://huggingface.co/terms-of-service). It also describes how to file a counter notice if your Content was disabled because of a DMCA takedown notice and you believe it was disabled by mistake or misidentification.

## Guide to Filing a DMCA Takedown Notice

### Before You Start

**Tell the truth.** A DMCA notice requires you to swear to the facts in your complaint under penalty of perjury. Knowingly submitting false information is a federal crime and can also expose you to civil liability for damages.

**Investigate first.** Filing a DMCA notice is a serious legal claim with real consequences for the Users whose Content gets removed. Before submitting, make sure you've looked closely enough to be confident the use isn't permitted. Check whether the Content is covered by an open license, whether the use might qualify as fair use, and whether you're looking at the right Repository at all.

**This is for copyright, not other issues.** DMCA notices are only for copyright infringement claims against a specific copyrightable work. If your concern is about something else, such as a trademark, personal data, harassment, or another Content Policy issue, please use our general reporting channels instead. A copyright notice isn't the right tool for those.

**Hugging Face Repositories aren't like a typical website, and that affects what a valid claim looks like.** A Repository can be a Model, Dataset, or Space, and each raises different questions.

- A Model Repository can include weights, a model card, and example outputs. These aren't the same kind of Content and may need to be identified differently.
- A Dataset Repository's Content is the data itself, or a specific split or subset of it.
- A Space can involve its code, its interface, or what it produces when run. Space **outputs are generally not stored anywhere.** If your concern is about something a Space produced rather than the Space's underlying code or Model, see the note on outputs in section [Your Notice Must Include](https://huggingface.co/docs/hub/dmca#your-notice-must-include) "Identification of the allegedly infringing Content".
- Repositories can be duplicated on the Hub. If you believe duplicates of a Repository are also infringing, please identify them explicitly. For a large number of duplicates, you can instead state that you've reviewed a representative sample and believe the rest infringe to the same extent.

**Have you actually considered fair use?** Fair use can permit certain uses of copyrighted material without the owner's permission, for example when only a small amount is used, the use is transformative, or the use is for educational purposes. Your notice will ask you to affirmatively state that you've considered this.

### Your Notice Must Include

1. **An acknowledgment** that you've read and understood this guide.
2. **Identification of the copyrighted work** you believe is infringed. If it's published, a link is usually enough. If it's unpublished or proprietary, describe it. If it's registered with a copyright office, include the registration number.
3. **Identification of the allegedly infringing Content**, specific enough for us to locate it.
      - For Models: the Repository, and if only part of it infringes (specific files, the model card, example outputs), say so specifically.
      - For Datasets: the Repository, and the specific split, subset, or file if the whole Dataset isn't at issue.
      - For Spaces: the Repository or code, or, if you're reporting a **specific output** rather than the Space's code or underlying Model, a link to where that output is actually stored (for example, within the Space's files or a linked Dataset used for logging). If no such stored output exists, please identify the underlying Model or Space Repository instead. We can only act on Content that can actually be located.
4. **What kind of issue this is.** For example: an unauthorized direct copy, a missing attribution required by a license, a license violation, or an unauthorized derivative work. This helps us route your notice appropriately.
5. **What remedy you're seeking.** For example: removal of specific files, addition of attribution, or removal of an entire Repository.
6. **Your contact information:** name, email, phone, and physical address.
7. **Contact information for the alleged infringer, if known.** Usually their Hugging Face username is enough.
8. **Confirmation of your relationship to the copyrighted work.** State whether you're the copyright owner or authorized to act on the owner's behalf. If the latter, include a brief statement of that authority.
9. **A statement that you've considered fair use** and don't believe it applies.
10. **A good-faith statement** that the use isn't authorized by the copyright owner, its agent, or the law.
11. **A statement under penalty of perjury** that the information you've provided is accurate and that you are, or are authorized to act on behalf of, the copyright owner.
12. **Your signature** (physical or electronic).

### How to Submit

The fastest way to submit a notice is through our [copyright report form](https://huggingface.co/private-report/dmca-takedown). If you're unable to use the form, you can also send a complete notice to [dmca@huggingface.co](mailto:dmca@huggingface.co). A complete notice sent by either method will be processed.

## Guide to Filing a DMCA Counter Notice

If your Content was disabled because of a DMCA takedown notice and you believe it was disabled by mistake or misidentification, you can file a counter notice.

### Before You Start

**Tell the truth.** Like a takedown notice, a counter notice must be sworn under penalty of perjury. Knowingly false statements are a federal crime and can expose you to civil liability.

**Investigate and consider getting legal advice.** Filing a counter notice can lead to real legal consequences. If the original complainant disagrees, they can pursue legal action to keep your Content down. Take the claim seriously and consider talking to an attorney before responding.

**You need an actual good-faith belief of mistake.** A counter notice isn't a way to argue that the original claim was wrong on the merits. It's specifically for cases where you believe the Content was removed as a result of a mistake or misidentification.

### Your Counter Notice Must Include

1. **An acknowledgment** that you've read and understood this guide.
2. **Identification of the removed Content and where it was located** before it was disabled.
3. **A good-faith statement** that the material was removed or disabled as a result of mistake or misidentification.
4. **Consent to jurisdiction:** a statement consenting to the jurisdiction of the relevant federal court.
5. **Your contact information:** name, email, phone, and physical address.
6. **A statement under penalty of perjury** that the information you've provided is accurate.
7. **Your signature** (physical or electronic).

### What Happens Next

If we receive a complete counter notice, we will inform the original claimant, who will have **14 days** to notify us that they've taken legal action to prevent the Content from being restored, consistent with our Content Policy. If we don't hear from them within that window, we'll restore the Content.

### How to Submit

Submit your counter notice through our [counter notice report form](https://huggingface.co/private-report/dmca-counter-notice), or send a complete notice to [dmca@huggingface.co](mailto:dmca@huggingface.co).