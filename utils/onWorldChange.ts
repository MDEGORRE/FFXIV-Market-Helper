/**
 * Fetch data from Universalis to retrieve market prices and last upload time for a selected world. Then assign lodestone id to show FFXIV item tooltip.
 * 
 * @param selectedWorld 
 * @param selectedLanguage
 * @param items 
 * @param itemsIds 
 * @param hq: if true will check High quality version of the item. Default: false
 * @returns
 */

export default async function (selectedWorld: string, selectedLanguage: string, items: Array<Object>, itemsIds: Array<Number>, hq: Boolean = false) {
    try {
        const response = await fetch("https://universalis.app/api/v2/aggregated/" + selectedWorld + "/" + itemsIds.join(","))
        if (response.ok) {
            const data = await response.json()

            // do not keep items that are not sold on the world
            const filterItems = data.results.filter((item) => hq ? item.hq.minListing.hasOwnProperty('world') : item.nq.minListing.hasOwnProperty('world'))
            let sortedItems;
            if (hq === false) {
                sortedItems = filterItems.toSorted((a,b) => a.nq.minListing.world.price <= b.nq.minListing.world.price ? 1 : -1 )
            }
            else sortedItems = filterItems.toSorted((a,b) => a.hq.minListing.world.price <= b.hq.minListing.world.price ? 1 : -1 )

            const secondresponse =  await fetch("https://universalis.app/api/v2/" + selectedWorld + "/" + sortedItems.map((item) => item.itemId).join(",") + "?fields=items.lastUploadTime")
            const lastUploadTimes = await secondresponse.json()

            // assign the lodestone id of item to show the link tooltip
            const newresponse = await fetch("https://raw.githubusercontent.com/Asvel/ffxiv-lodestone-item-id/refs/heads/master/lodestone-item-id.txt")
            const lodestoneIdsText = await newresponse.text()
            const lodestoneIds = lodestoneIdsText.split('\n')

            let languageLink;
            switch (selectedLanguage) {
                case 'en': languageLink = 'eu';
                break;
                case 'ja': languageLink = 'jp';
                break;
                default: languageLink = selectedLanguage
            }
            
            sortedItems.map((item)=> {
                item.lodestoneLink = "https://" + languageLink + ".finalfantasyxiv.com/lodestone/playguide/db/item/" + lodestoneIds[item.itemId - 1];
                item.lastUploadTime = lastUploadTimes.items[parseInt(item.itemId)].lastUploadTime;
            })

            items.value = sortedItems
            return items.value
        }
    } 
    catch (error) {
        const message = "Not able to get data"
        alert(message);
        throw new Error(message)
    }
}