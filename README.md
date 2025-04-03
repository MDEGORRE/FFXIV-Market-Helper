# Final Fantasy XIV Market Helper

## Introduction

Welcome to my first Nuxt project ! This project shows items prices from the game Final Fantasy XIV developed by Square Enix. It relies on the Universalis API, an application that provides game items prices. This website is not affiliated to Square Enix.

## What can be done with this application ?

- Select a world and get the prices of items. Items are showed from the most expensive to the cheapest ones. Also you get the last updated time data has been provided.
- You can select a favorite world and choose the language for items names, stored in the browser.
- Each item has the FFXIV lodestone link and the FFXIV tooltip based on the language selected (english by default).
- You can filter some items: materias, gears.
- For the gear items: you can filter items for a specific class (dps ranged, healer, ...) and you get an indication of the minimum regional price.

## Tools and learnings from this project

- Nuxt fundamentals (pages, SEO)
- I used the Humanize-duration library to convert timestamps.
- Flowbite Vue for the interface.
- Loading external script: the goal was to use the tooltip script provided by Square Enix.

## Future development

- Application fully translated in french / english
- UI improvements
- Grouping worlds by datacenter and a checkbox option to show only worlds from a specific region.
- Modals with a chart showing past item price history

Feel free to contact me if you found any issues.