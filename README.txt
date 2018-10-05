The project is a single-page search website empowered by Marvel's public API and the front-end framework Bootstrap. Before you download and run the project, make sure you have registered as a Marvel Insider and applied for a set of public and private API keys. The keys are required to access Marvel's API. 

Requirements:
    Bootstrap
    jQuery

Design Process:
    1. Clean cover page with the core function placed in the center. I deliberately set the title and the search input fields at the center of the viewport. Because users' sight will naturally concentrate at the center of the window when it is opened. The layout of other components such as logo and "Restart" button are separated from the core so that users' wouldn't find the page messy and crumbled. The theme matches that of Marvel's with a dark background and a red "SEARCH" button. 

    2. A restart button is provided for users to reset the webpage to its original state and clean the records. This is simply a shortcut so that users don't have to refresh the page through browsers' refresh function.

    3. Tooltips are included for components that might confuse users. For instance, "Start year" might be confusing since it doesn't mean the time range of the search but the year when the comic series was first issued. If users are not well informed, they might mistakenly conclude, for example, Avengers only has 4 series starting from 2000. The fact is that there are 4 Avengers series which were first issued in 2000.

    4. Issue format can be chosen from a dropdown list instead of text input. Because issue format provided by the API only includes a limited number of choices. It is wise to prevent user errors by limiting the choices to only the valid ones.

    5. Title field cannot be empty or only contain spaces. An alert with specific explanation of the error and brief instruction of further steps will be triggered if users accidentally or deliberately search with an empty title.

    6. Start year is restricted to the range from the year of Marvel's first published comics to the current year (1967-current). Hence, users wouldn't try meaningless "Start year" such as 1000 or 3000. 

    7. Default values for the two input search fields are provided. It's a reasonable set of values which returned 4 records with sufficient information included, such as comic's description, cover image and characters. Users can immediately try out without knowing anything specific about the search function by clicking the conspicuous "SEARCH" button.

    8. All alert messages are triggered as soon as the erroneous action takes place and before a query is fired to the Marvel's server. In this way, users will not wait until the server's response to see the error and a meaningless request can be prevented.

    9. Detailed information is folded. Users search comics with their titles' starting letters and other filters and receive the results as a list of comics. The titles are displayed. User can further acquire more information, such as the publication's description, cover image, characters and their descriptions, by clicking the container of each title. A card object will expand or collapse upon clicking. It will stay expanded or collapsed even if another card is being operated. So that the user has the freedom to keep what he or she wants. 
    
    10. A customized thumbnail is provided for cases either the character contains no thumbnail or no characters are recorded in the database for the comics. However, no suitable cover image replacement is better than the one provided by Marvel. So the not-found image replacement is used for comic's cover. 

    11. Next page and previous page buttons are displayed only if the next or the previous page is available. If not, users will not see the buttons and thus avoid potential user error. 

    12. Progress bar is displayed below the search result section so that user can have an idea how far is the loading process even when the front page is completed. Next page function is only allowed when all search results are loaded. Therefore, when users start to navigate through pages, all results are ready to be viewed.

    13. In the backend, since characters are repetitive across multiple comics series, searched characters are recorded in the cache so that same queries will not be issued twice. 

    14. Research results can be sorted according to their titles or issue numbers. The sorting order can also be ascending or descending. It is up to users' choice which sort type to implement. As soon as the sorting is triggered, the displayed results will be refreshed to the first ten records, which is the first page. 
