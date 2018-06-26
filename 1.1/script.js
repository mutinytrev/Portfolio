/*
	Author: Trevor Campbell (Cates)
	Date: 5/5/2018
	Description: This will be the main javascript for the MutinyWerks Official Website
*/

function Calendar() // The Calendar that shows up on the sidebar of the main page.
{
	var dayNum = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var daySuffix = ["st","nd","rd","th"];
	var suffix;
	var thisMonthDays;
	var lastMonthDays;
	var nextMonthDays;
	var daySlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
	var firstDaySlot;
	var lastDaySlot;
	var firstDay;
	var lastDay;
	var daysFromOne;
	var today;
	var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var thisMonth;
	var lastMonth;
	var date;
	var dd;
	var day;
	var mm;
	var yyyy;
	
	// First, I need to get today's date
	
	function getDate()
	{
		date = new Date();
		dd = date.getDate();
		day = date.getDay();
		mm = date.getMonth()+1;
		yyyy = date.getFullYear();
	}
	
	// Then, I need to associate today's date with the day of the week.
	// NOTE: Sunday = 0, Saturday = 6
	
	function getDayName()
	{
		for(var i = 0; i < 7; i++)
		{
			if(day === i)
			{
				today = dayName[i];
			}
		}
	}
	
	// Now, I need to assign the month name to the month .
	
	function getMonth()
	{
		for(var i = 0; i < 12; i++)
		{
			if(mm === (i + 1))
			{
				thisMonth = month[i];
			}
		}
	}
	
	// Next, I need to figure out how many days are in the month.
	// NOTE: Jan = 31, Feb = 28 or 29 (Special Function for Leap Year), Mar = 31, Apr = 30, May = 31, Jun = 30, Jul = 31, Aug = 31
    // Sep = 30, Oct = 31, Nov = 30, Dec = 31	
	
	function getDaysPerMonth()
	{
		for(var i = 1; i < 13; i++)
		{
			if(mm === i)
			{
				if(mm === 1 || mm === 3 || mm === 5 || mm === 7 || mm === 8 || mm === 10 || mm === 12)
				{
					thisMonthDays = 31;
				}
				else
					if(mm === 4 || mm === 6 || mm === 9 || mm === 11)
					{
						thisMonthDays = 30;
					}
					else
						if(mm == 2)
						{
							if((yyyy % 4) === 0)
							{
								thisMonthDays = 29;
							}
							else
								thisMonthDays = 28;
						}
			}
		}
	}
	
	// Now, we write the month and year to the head of our Calendar.
	
	function getHeader()
	{
		for(i = 1; i < 32; i++)
		{
			if(dd === i)
			{
				if(i === 1 || i === 21 || i == 31)
				{
					suffix = daySuffix[0];
				}
				else
					if(i === 2 || i === 22)
					{
						suffix = daySuffix[1];
					}
					else
						if(i === 3 || i === 23)
						{
							suffix = daySuffix[2];
						}
						else
							suffix = daySuffix[3];
			}
		}
		document.getElementById("date").innerHTML = today + ", " + thisMonth + " " + dd + suffix + ", " + yyyy;
	}
	
	function getModifiedHeader() // For previous month / next month functions
	{
		document.getElementById("date").innerHTML = thisMonth + " " + yyyy;
	}
	
	// Then, we need to assign each day of the month to a weekday.
	
	function assignDays()
	{
		// Start with figuring out which slot on the calendar the month starts on.
		// To do this, we start by figuring out which day of the week the month starts on.
		
		for(var i = daysFromOne + 1; i > 0; i--)
		{
			if(firstDay === 0)
			{
				firstDay = 6;
			}
			else
				firstDay = firstDay - 1;
		}
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		
		// Now, we need to figure out which days to gray out
		
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < (firstDaySlot + 1); i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ (firstDaySlot + 1)).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 2); i < (thisMonthDays + 3); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = i;
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
	}
	
	function nextMonthAssignDays() // For previous month / next month functions
	{
		// First I need to clear the css statements from before:
		for(var i = 1; i < 43; i++)
		{
			$("#slot-"+ i).css("background-color", "");
			$("#slot-"+ i).css("color", "");
			document.getElementById("slot-" + i).innerHTML = "";
		}
		for(var i = daysFromOne + 1; i > 0; i--)
		{
			if(firstDay === 0)
			{
				firstDay = 6;
			}
			else
				firstDay = firstDay - 1;
		}
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot > 7)
		{
			firstDaySlot = daySlots[(firstDay-7)];
		}

		// Now, we need to figure out which days to gray out
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < firstDaySlot; i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ firstDaySlot).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 1); i < (daySlots.length + 1); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = thisMonthDays + (firstDaySlot -1);
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
	}
	
	function previousMonthAssignDays()
	{
		// First I need to clear the css statements from before:
		for(var i = 1; i < 43; i++)
		{
			$("#slot-"+ i).css("background-color", "");
			$("#slot-"+ i).css("color", "");
			document.getElementById("slot-" + i).innerHTML = "";
		}
		
		firstDay = lastDay - lastMonthDays;
		firstDay = firstDay - thisMonthDays;
		
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		while(firstDay < 7)
		{
			firstDay = firstDay + 7;
		}
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot < 0)
		{
			firstDaySlot = daySlots[(firstDay + 6)];
		}
		/*
		if(firstDay < 0)
		{
			firstDay = firstDay + 6;
		}
		alert(firstDay);
		*/
		// Now, we know the day the month started on. Now, we can determine which slot on the calendar to start on.
		
		firstDaySlot = daySlots[firstDay];
		if(firstDaySlot > 7)
		{
			firstDaySlot = daySlots[(firstDay-7)];
		}
		
		// Now, we need to figure out which days to gray out
		// if a slot number is less than firstDay's value, then it should be grayed out.
		
		for(var i = 0; i < firstDaySlot; i++)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + (i + 1)).innerHTML = "I";
		}		
		
		// Now, I draw the First Day
		
		var j = 0;
		document.getElementById("slot-"+ firstDaySlot).innerHTML = dayNum[j];
		
		// Then, The rest of the Month
		
		for(var i = (firstDaySlot + 1); i < (daySlots.length + 1); i++)
		{
			j++;
			document.getElementById("slot-" + i).innerHTML = dayNum[j];
			lastDay = thisMonthDays + (firstDaySlot -1);
		}
		
		for(var i = 42; i > lastDay; i--)
		{
			$("#slot-"+ i).css("background-color", "#f1f1f1");
			$("#slot-"+ i).css("color", "#f1f1f1");
			document.getElementById("slot-" + i).innerHTML = "I";
		}	
		
	}
	
	function getThisMonth()
	{
		getDate();
		firstDay = day;
		getDayName();
		getMonth();
		getDaysPerMonth();
		getHeader();
		daysFromOne = dd - 1;
		assignDays();
	}
	
	function getNextMonth()
	{
		// I need to increment the month + 1
		mm = mm + 1;
		if(mm > 12)
		{
			mm = mm - 12;
			yyyy++;
		}
		// getMonth should be unchanged
		getMonth();
		getDaysPerMonth();
		// I need to figure out what day slot to start the month on
		// This will start with figuring out which slot the current month ended on.
		// lastDay = the slot the current month ended on. The slot the month ended on - 27 = the slot the next month starts on.
		firstDay = lastDay - 27;
		getModifiedHeader();
		daysFromOne = 0;
		nextMonthAssignDays();
	}
	
	function getLastMonth()
	{
		// I need to increment the month + 1
		lastMonthDays = thisMonthDays;
		mm = mm - 1;
		if(mm < 1)
		{
			mm = mm + 12;
			yyyy--;
		}
		// getMonth should be unchanged
		getMonth();
		getDaysPerMonth();
		// I need to figure out what day slot to start the month on
		// This will start with figuring out which slot the current month ended on.
		// firstDay = the day the Month should start on. 
		getModifiedHeader();
		daysFromOne = 0;
		previousMonthAssignDays();
	}
	
	function eventListeners()
	{
		if(window.addEventListener)
		{
			document.getElementById("next-month").addEventListener("click", getNextMonth);
			document.getElementById("prev-month").addEventListener("click", getLastMonth);
		}
		else
			if(window.attachEvent)
			{
				document.getElementById("next-month").attachEvent("onclick", getNextMonth);
				document.getElementById("prev-month").attachEvent("onclick", getLastMonth);
			}
	}
	
	getThisMonth();
	eventListeners();
}

var mainContainer = document.getElementById("main-content");
	
var portfolioMenu = document.getElementById("portfolio-link");
var portfolio = document.getElementById("portfolio");
var post = document.getElementById("post");
var artProject = document.getElementById("art-projects-link");
var codeProject = document.getElementById("code-projects-link");
var designProject = document.getElementById("design-projects-link");
	
var artProjectsContainer = document.getElementById("art-projects-container");
var codeProjectsContainer = document.getElementById("code-projects-container");
var designProjectsContainer = document.getElementById("design-projects-container");

var creativeLink = document.getElementById("creative-link");
var creativeContainer = document.getElementById("creatives-container");

var quoteLink = document.getElementById("quote-link");
var quoteContainer = document.getElementById("quote-form");

var artOne = document.getElementById("art-1");
//var artTwo = document.getElementById("art-2");

var artProjectOne = document.getElementById("art-project-1");
//var artProjectTwo = document.getElementById("art-project-2");

var artProjectOnePage = document.getElementById("art-project-1-page");

var codeOne = document.getElementById("code-1");
var codeTwo = document.getElementById("code-2");
var codeThree = document.getElementById("code-3");

var codeProjectOne = document.getElementById("code-project-1");
var codeProjectTwo = document.getElementById("code-project-2");
var codeProjectThree = document.getElementById("code-project-3");

var codeProjectOnePage = document.getElementById("code-project-1-page");
var codeProjectTwoPage = document.getElementById("code-project-2-page");
var codeProjectThreePage = document.getElementById("code-project-3-page");

var designOne = document.getElementById("design-1");
var designTwo = document.getElementById("design-2");

var designProjectOne = document.getElementById("design-project-1");
var designProjectTwo = document.getElementById("design-project-2");

var designProjectOnePage = document.getElementById("design-logo-project-page");
var designProjectTwoPage = document.getElementById("design-button-project-page");

var designLogoOne = document.getElementById("logo-1");
var designLogoTwo = document.getElementById("logo-2");
var designLogoThree = document.getElementById("logo-3");
var designLogoFour = document.getElementById("logo-4");
var designLogoFive = document.getElementById("logo-5");

function contentSwap()
{
	// This function will swap the content based on the portfolio option clicked.
	// Options: Art Projects, Code Projects, Design Projects
		
	function whenPortfolioClicked()
	{
		// Fade Everything Else Out
			
		$(post).fadeTo(250, 0);
		$(post).hide();
		$(creativeContainer).hide();
		$(quoteContainer).hide();
		
		// Fade Portfolio Menu In
		
		$(portfolio).fadeTo(250, 1);
		$(artProject).delay(250);
		$(artProject).fadeTo(250, 1);
		$(codeProject).delay(500);
		$(codeProject).fadeTo(250, 1);
		$(designProject).delay(750);
		$(designProject).fadeTo(250, 1);
	}
	
	function whenArtProjectsClicked()
	{
		// Fade Everything Else Out
		
		$(creativeContainer).hide();
		$(designProjectsContainer).hide();
		$(codeProjectsContainer).hide();
		$(quoteContainer).hide();
		
		// Fade Art Projects In
		
		$(artProjectsContainer).delay(250);
		$(artProjectsContainer).fadeTo(250, 1);
	}
	
	function whenCodeProjectsClicked()
	{
		// Fade Everything Else Out
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(designProjectsContainer).hide();
		$(artProjectsContainer).hide();
		
		// Fade Art Projects In
		
		$(codeProjectsContainer).delay(250);
		$(codeProjectsContainer).fadeTo(250, 1);
	}
	
	function whenDesignProjectsClicked()
	{
		// Fade Everything Else Out
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(codeProjectsContainer).hide();
		$(artProjectsContainer).hide();
		
		// Fade Art Projects In
		
		$(designProjectsContainer).delay(250);
		$(designProjectsContainer).fadeTo(250, 1);
	}
	
	function whenArtProjectOneClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(codeProjectsContainer).hide();
		$(designProjectsContainer).hide();
		
		$(artOne).hide();
		//$(artTwo).hide();
		
		// Show Art Project 1
		
		$(artProjectOnePage).delay(250);
		$(artProjectOnePage).fadeTo(250, 1);
	}
	
	function whenArtProjectOnePageClicked()
	{
		// Fade Everything Else Out

		$(artProjectOnePage).hide();
		
		// Fade Art Projects In
		
		$(artOne).delay(250);
		$(artOne).fadeTo(250, 1);
		
		//$(artTwo).delay(250);
		//$(artTwo).fadeTo(250, 1);
	}
	
	function whenCodeProjectOneClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(artProjectsContainer).hide();
		$(designProjectsContainer).hide();
		
		$(codeOne).hide();
		$(codeTwo).hide();
		$(codeThree).hide();
		
		// Show Code Project 1
		
		$(codeProjectOnePage).delay(250);
		$(codeProjectOnePage).fadeTo(250, 1);
	}
	
	function whenCodeProjectOnePageClicked()
	{
		// Fade Everything Else Out

		$(codeProjectOnePage).hide();
		
		// Fade Code Projects In
		
		$(codeOne).delay(250);
		$(codeOne).fadeTo(250, 1);
		
		$(codeTwo).delay(250);
		$(codeTwo).fadeTo(250, 1);
		
		$(codeThree).delay(250);
		$(codeThree).fadeTo(250, 1);

	}
	
	function whenCodeProjectTwoClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(artProjectsContainer).hide();
		$(designProjectsContainer).hide();
		
		$(codeOne).hide();
		$(codeTwo).hide();
		$(codeThree).hide();
		
		// Show Code Project 2
		
		$(codeProjectTwoPage).delay(250);
		$(codeProjectTwoPage).fadeTo(250, 1);
	}
	
	function whenCodeProjectTwoPageClicked()
	{
		// Fade Everything Else Out

		$(codeProjectTwoPage).hide();
		
		// Fade Code Projects In
		
		$(codeOne).delay(250);
		$(codeOne).fadeTo(250, 1);
		
		$(codeTwo).delay(250);
		$(codeTwo).fadeTo(250, 1);
		
		$(codeThree).delay(250);
		$(codeThree).fadeTo(250, 1);

	}
	
	function whenCodeProjectThreeClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(artProjectsContainer).hide();
		$(designProjectsContainer).hide();
		
		$(codeOne).hide();
		$(codeTwo).hide();
		$(codeThree).hide();
		
		// Show Code Project 3
		
		$(codeProjectThreePage).delay(250);
		$(codeProjectThreePage).fadeTo(250, 1);
	}
	
	function whenCodeProjectThreePageClicked()
	{
		// Fade Everything Else Out

		$(codeProjectThreePage).hide();
		
		// Fade Code Projects In
		
		$(codeOne).delay(250);
		$(codeOne).fadeTo(250, 1);
		
		$(codeTwo).delay(250);
		$(codeTwo).fadeTo(250, 1);
		
		$(codeThree).delay(250);
		$(codeThree).fadeTo(250, 1);

	}
	
	function whenDesignProjectOneClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(artProjectsContainer).hide();
		$(codeProjectsContainer).hide();
		
		$(designOne).hide();
		$(designTwo).hide();
		
		// Show Project One Page
		
		$(designProjectOnePage).delay(250);
		$(designProjectOnePage).fadeTo(250, 1);
	}
	
	function whenDesignProjectOnePageClicked()
	{
		// Fade Everything Else Out

		$(designProjectOnePage).hide();
		
		// Fade Design Projects In
		
		$(designOne).delay(250);
		$(designOne).fadeTo(250, 1);
		
		$(designTwo).delay(250);
		$(designTwo).fadeTo(250, 1);
	}
	
	function whenDesignProjectTwoClicked()
	{
		//Hide Everything
		
		$(quoteContainer).hide();
		$(creativeContainer).hide();
		$(artProjectsContainer).hide();
		$(codeProjectsContainer).hide();
		
		$(designOne).hide();
		$(designTwo).hide();
		
		// Show Project Two Page
		
		$(designProjectTwoPage).delay(250);
		$(designProjectTwoPage).fadeTo(250, 1);
	}
	
	function whenDesignProjectTwoPageClicked()
	{
		// Fade Everything Else Out

		$(designProjectTwoPage).hide();
		
		// Fade Design Projects In
		
		$(designOne).delay(250);
		$(designOne).fadeTo(250, 1);
		
		$(designTwo).delay(250);
		$(designTwo).fadeTo(250, 1);
	}
	
	function eventListeners()
	{
		portfolioMenu.addEventListener("click", whenPortfolioClicked);
		artProject.addEventListener("click", whenArtProjectsClicked);
		codeProject.addEventListener("click", whenCodeProjectsClicked);
		designProject.addEventListener("click", whenDesignProjectsClicked);
		artProjectOne.addEventListener("click", whenArtProjectOneClicked);
		artProjectOnePage.addEventListener("click", whenArtProjectOnePageClicked);
		codeProjectOne.addEventListener("click", whenCodeProjectOneClicked);
		codeProjectOnePage.addEventListener("click", whenCodeProjectOnePageClicked);
		codeProjectTwo.addEventListener("click", whenCodeProjectTwoClicked);
		codeProjectTwoPage.addEventListener("click", whenCodeProjectTwoPageClicked);
		codeProjectThree.addEventListener("click", whenCodeProjectThreeClicked);
		codeProjectThreePage.addEventListener("click", whenCodeProjectThreePageClicked);
		designProjectOne.addEventListener("click", whenDesignProjectOneClicked);
		designProjectOnePage.addEventListener("click", whenDesignProjectOnePageClicked);
		designProjectTwo.addEventListener("click", whenDesignProjectTwoClicked);
		designProjectTwoPage.addEventListener("click", whenDesignProjectTwoPageClicked);
	}
	
	eventListeners();
}

function creativesShow()
{	
	function whenCreativeLinkClicked()
	{
		// Hide everything
		
		$(quoteContainer).hide();
		$(codeProjectsContainer).hide();
		$(artProjectsContainer).hide();
		$(designProjectsContainer).hide();
		$(portfolio).hide();
		$(post).hide();
		
		// Change grid format
		
		// Fade Creative Works Page In
		
		$(creativeContainer).delay(250);
		$(creativeContainer).fadeTo(250, 1);
		
	}
	
	function eventListeners()
	{
		creativeLink.addEventListener("click", whenCreativeLinkClicked);
	}
	
	eventListeners();
}

function quoteFormShow()
{
	/*
	var submitBtn = document.getElementById("submitbtn");
	var formName = document.getElementById("name-input");
	var formEmail = document.getElementById("email-input");
	var formPhone = document.getElementById("phone-input");
	var formDesc = document.getElementById("description").value;
	*/
	
	function whenQuoteLinkClicked()
	{
		// Hide everything
		
		$(codeProjectsContainer).hide();
		$(artProjectsContainer).hide();
		$(designProjectsContainer).hide();
		$(portfolio).hide();
		$(post).hide();
		$(creativeContainer).hide();
		
		// change grid format
		
		// Fade Quote form in
		
		$(quoteContainer).delay(250);
		$(quoteContainer).fadeTo(250, 1);
	}
	
	function whenButtonClicked()
	{
		var link = "mailto:tdcampbell1980@gmail.com"
		+ "&subject=" + escape("Quote Request from " + formName)
		+ "&body=" + escape("Reply to: " + formEmail + " or " + formPhone + " " + description);
		
		window.location.href = link;
	}
	
	function eventListeners()
	{
		quoteLink.addEventListener("click", whenQuoteLinkClicked);
		//submitBtn.addEventListener("click", whenButtonClicked);
	}
	
	eventListeners();
}

window.addEventListener("load", Calendar);
window.addEventListener("load", contentSwap);
window.addEventListener("load", creativesShow);
window.addEventListener("load", quoteFormShow);