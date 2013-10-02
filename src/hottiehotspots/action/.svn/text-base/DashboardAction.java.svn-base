package hottiehotspots.action;

import hottiehotspots.general.DistanceHelper;
import hottiehotspots.general.HHProperties;
import hottiehotspots.general.MenuHelper;
import hottiehotspots.model.GEOCities;
import hottiehotspots.model.Label;
import hottiehotspots.model.User;
import hottiehotspots.service.GEOCitiesService;
import hottiehotspots.service.HotspotService;
import hottiehotspots.service.LocationService;
import hottiehotspots.service.UserService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.maxmind.geoip.Location;
import com.maxmind.geoip.LookupService;
import com.maxmind.geoip.regionName;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

public class DashboardAction extends ActionSupport implements Preparable,
		SessionAware, ServletRequestAware {

	private static final long serialVersionUID = 3747442808338788577L;
	private User user;
	private String userDefaultLocation = "";
	private LocationService locationService;
	private HotspotService hotspotService;
	private UserService userService;
	private GEOCitiesService geoCitiesService;
	private GEOCities currentLocation;
	private Map session;
	private HttpServletRequest request;
	private static final Log log = LogFactory.getLog(DashboardAction.class);
	private String searchString;
	private String searchLocation;

	public DashboardAction(LocationService service, UserService service2,
			GEOCitiesService service3, HotspotService service4) {
		this.locationService = service;
		this.userService = service2;
		this.geoCitiesService = service3;
		this.hotspotService = service4;
	}

	public DashboardAction() {

	}

	@org.apache.struts2.interceptor.validation.SkipValidation
	public String execute() {
		ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(request.getSession()
						.getServletContext());

		session = ActionContext.getContext().getSession();
		if (session == null)
			return "homepage";

		session.put("menu", MenuHelper.DASHBOARD); // highlight correct menu
													// item
		setUser((User) session.get("user"));

		// COMMENTED UNTIL FULLY IMPLEMENTED
		/*
		 * HHMailerManager mailerManager = HHMailerManager.getInstance(context);
		 * String emailContent = "Greetings from HottieHotspots.com,\n" +
		 * "This is an email confirming your registration at our site.";
		 * EmailContainer email = new
		 * EmailContainer("HottieHotspots Account Activation", emailContent,
		 * EmailContainer.ContentType.TEXT, user.getEmail());
		 * mailerManager.send(email);
		 */

		if (getUser() == null) {
			// user is not logged in kick them back to the login page
			return "homepage";
		}
		
		
		/*
		 * Setup 'Recently Tagged' part of the dashboard
		 */
		prepareNewestHotspotsList();
		
		/*
		 * Setup 'Top Hotspots' part of the dashboard
		 */
		prepareTopHotspotsList();
		

		currentLocation = (GEOCities) session.get("currentLocation");

		if (currentLocation == null) {
			// no location set, see if the user has a default city
			if (user.getDefaultCity() == null) {
				// determine the location of the user via IP
				GEOCities tempCity = getUsersLocationByIP(
						request.getRemoteAddr(), context);
				if (tempCity == null) {
					// don't have a location for the user, set to New York
					List foundCities = geoCitiesService.findCitiesStartingWith(
							"New York", "New York", "United States");
					GEOCities foundCity = (GEOCities) foundCities.get(0);
					session.put("currentLocation", foundCity);
					currentLocation = foundCity;

					// set the temporary default location of the user
					this.userDefaultLocation = foundCity.getCity() + ", "
							+ foundCity.getRegionId().getRegion() + ", "
							+ foundCity.getCountryId().getCountry();

				} else {
					currentLocation = tempCity;

					// set the temporary default location of the user
					this.userDefaultLocation = tempCity.getCity() + ", "
							+ tempCity.getRegionId().getRegion() + ", "
							+ tempCity.getCountryId().getCountry();

					session.put("currentLocation", currentLocation);
				}
			} else {
				currentLocation = user.getDefaultCity();
				userDefaultLocation = currentLocation.getCity() + ", "
						+ currentLocation.getRegionId().getRegion() + ", "
						+ currentLocation.getCountryId().getCountry();
				session.put("currentLocation", currentLocation);
			}
		} else {
			// user could have refreshed the page without setting a default
			// location, but we have a location so let's use that to be safe
			userDefaultLocation = currentLocation.getCity() + ", "
					+ currentLocation.getRegionId().getRegion() + ", "
					+ currentLocation.getCountryId().getCountry();
		}

		// get existing hotspots from our database
		ArrayList hotspots = (ArrayList) getLocalHotspots();
		session.put("localHotspots", hotspots); // store hotspots for display

		if (hotspots == null || hotspots.size() < 10) {
			// not many hotspots for this area so lets get some suggestions

			
			Set<hottiehotspots.model.Location> googleLocations = new HashSet<hottiehotspots.model.Location>();
			
			// second look on google
			String category = "Bar";
			Set<hottiehotspots.model.Location> barLocations = null;

			barLocations = searchGoogle(category,
					Float.toString(currentLocation.getLatitude()),
					Float.toString(currentLocation.getLongitude())); // TODO
																		// search
																		// based
																		// on
																		// user
																		// interests

			// format the results for use
			googleLocations = composeGoogleLocations(googleLocations,
					barLocations, category);

			category = "Gym";
			Set<hottiehotspots.model.Location> gymLocations = null;

			gymLocations = searchGoogle(category,
					Float.toString(currentLocation.getLatitude()),
					Float.toString(currentLocation.getLongitude())); // TODO
																		// search
																		// based
																		// on
																		// user
																		// interests

			// format the results for use
			googleLocations = composeGoogleLocations(googleLocations,
					gymLocations, category);

			category = "Coffee";
			Set<hottiehotspots.model.Location> coffeeLocations = null;

			coffeeLocations = searchGoogle(category,
					Float.toString(currentLocation.getLatitude()),
					Float.toString(currentLocation.getLongitude())); // TODO
																		// search
																		// based
																		// on
																		// user
																		// interests

			// format the results for use
			googleLocations = composeGoogleLocations(googleLocations,
					coffeeLocations, category);

			category = "Restaurant";
			Set<hottiehotspots.model.Location> restaurantLocations = null;

			restaurantLocations = searchGoogle(category,
					Float.toString(currentLocation.getLatitude()),
					Float.toString(currentLocation.getLongitude())); // TODO
																		// search
																		// based
																		// on
																		// user
																		// interests

			// format the results for use
			googleLocations = composeGoogleLocations(googleLocations,
					restaurantLocations, category);

			
			/**
			 * determine if there are duplicates in the local hotspots and
			 * google results
			 */
			if (hotspots != null && googleLocations != null) {
				Iterator lIter = hotspots.iterator();
				while (lIter.hasNext()) {
					hottiehotspots.model.Location lResult = (hottiehotspots.model.Location) lIter
							.next();
					Iterator gIter = googleLocations.iterator();
					boolean duplicate = false;

					while (gIter.hasNext()) {
						hottiehotspots.model.Location gResult = (hottiehotspots.model.Location) gIter
								.next();
						log.info("\nComparing hotspot vs google results ");
						log.info("hotspot: \n" + "name: '"
								+ lResult.getName() + "'\n" + "lat: '"
								+ lResult.getLatitude() + "'\n" + "lng: '"
								+ lResult.getLongitude() + "'\n");
						log.info("google: \n" + "name: '"
								+ gResult.getName() + "'\n" + "lat: '"
								+ gResult.getLatitude() + "'\n" + "lng: '"
								+ gResult.getLongitude() + "'\n");

						if (lResult.getName().equalsIgnoreCase(
								gResult.getName())
								&& lResult.getLatitude().equals(
										gResult.getLatitude())
								&& lResult.getLongitude().equals(
										gResult.getLongitude())) {
							googleLocations.remove(gResult);
							duplicate = true;
							break;
						}
					}
				}
			}

			// limit the list of google results
			if (googleLocations != null && googleLocations.size() > 10) {
				// limit to 10

				Set<hottiehotspots.model.Location> limLocations = new HashSet<hottiehotspots.model.Location>();
				Iterator iter = googleLocations.iterator();
				for (int i = 0; i < 10; i++) {
					limLocations.add((hottiehotspots.model.Location) iter
							.next());
				}
				googleLocations = limLocations;

			}

			session.put("googleLocations", googleLocations); // store google
																// locations for
																// display
			

		}

		return Action.SUCCESS;
	}

	private GEOCities getUsersLocationByIP(String ip, ApplicationContext context) {

		ip = "68.9.26.242"; // TODO Change to pick up dynamically and revert if
							// localhost
		Location l1 = null;

		GEOCities tempLocation = null;
		GEOCities returnedLocation = null;

		try {
			HHProperties geoIPDAT = (HHProperties) context
					.getBean("hhProperties");

			LookupService cl = new LookupService(
					geoIPDAT.getGeoIPDATLocation(),
					LookupService.GEOIP_MEMORY_CACHE);
			l1 = cl.getLocation(ip);

			System.out.println("countryCode: " + l1.countryCode
					+ "\n countryName: " + l1.countryName + "\n region: "
					+ l1.region + "\n regionName: "
					+ regionName.regionNameByCode(l1.countryCode, l1.region)
					+ "\n city: " + l1.city + "\n postalCode: " + l1.postalCode
					+ "\n latitude: " + l1.latitude + "\n longitude: "
					+ l1.longitude + "\n metro code: " + l1.metro_code
					+ "\n area code: " + l1.area_code);

			cl.close();
		} catch (Exception e) {
			log.error("Problem getting location from IP for user: "
					+ user.getUserName());
		}

		if (l1 != null) {
			tempLocation = new GEOCities();
			tempLocation.setCity(l1.city);

			List<GEOCities> tempCities = geoCitiesService
					.findCities(tempLocation);

			if (tempCities != null) {
				if (tempCities.size() == 1) {
					// found it
					returnedLocation = tempCities.get(0);
				} else {
					// found multiple, narrow it down to one
					for (GEOCities acity : tempCities) {
						String foundCountry = acity.getCountryId().getISO2();
						String curCountry = l1.countryCode;
						if (foundCountry.equals(curCountry)) {
							String foundRegion = acity.getRegionId()
									.getRegion();
							String curRegion = regionName.regionNameByCode(
									l1.countryCode, l1.region);
							if (foundRegion.equalsIgnoreCase(curRegion)) {
								returnedLocation = acity;
								break;
							}
						}
					}
				}
			} else {
				return returnedLocation;
			}
		} else {
			return returnedLocation;
		}

		return returnedLocation;
	}

	public List getLocalHotspots() {
		return getLocalHotspots("", 20, null);
	}
	public List getLocalHotspots(GEOCities uArea) {
		return getLocalHotspots("", 20, uArea);
	}
	public List getLocalHotspots(String searchText, GEOCities uArea) {
		return getLocalHotspots(searchText, 20, uArea);
	}

	public List getLocalHotspots(String searchText, Integer radius, GEOCities uArea) {
		// return an empty list if we can't find anything in the system, because
		// we will just do a search from other services (yelp,google)
		// to help populate the system
		if(uArea == null)
			uArea = currentLocation;

		ArrayList results = null;
		try {
			if (uArea != null) {
				if (searchText != null && !(searchText.trim().equals(""))) {
					// get the top Hotspots for the defined area and search criteria
					results = (ArrayList) hotspotService
							.findHotSpotsByCity(uArea, searchText); // TODO add limit
														// restriction parameter
				} else {
					// get the top Hotspots for the defined area
					results = (ArrayList) hotspotService.findHotSpotsByCity(
							uArea); // TODO add limit restriction
												// parameter
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return results;
		}

		if (results == null || results.size() < 9) {
			// look for hotspots by relative location
			double latitude;
			double longitude;
			ArrayList gpsResults = null;

			latitude = uArea.getLatitude();
			longitude = uArea.getLongitude();

			// trim GPS to one Integer
			// ex. '73.28328' = '73'
			// '73.68402' = '74'
			DecimalFormat df = new DecimalFormat("#0");

			String sLatitude = df.format(latitude);
			String sLongitude = df.format(longitude);

			double mLatitude = Double.parseDouble(sLatitude);
			double mLongitude = Double.parseDouble(sLongitude);
			if (searchText != null && !(searchText.trim().equals(""))) {
				gpsResults = (ArrayList) hotspotService.findHotSpotsByCoordinates(
						mLatitude, mLongitude, searchText);				
			} else {
				gpsResults = (ArrayList) hotspotService.findHotSpotsByCoordinates(
					mLatitude, mLongitude);
			}

			if (gpsResults != null) {
				DistanceHelper dH = new DistanceHelper();

				// find results that exist within 'radius' miles of the given
				// coordinates
				Iterator gIter = gpsResults.iterator();

				while (gIter.hasNext()) {
					hottiehotspots.model.Location curResult = (hottiehotspots.model.Location) gIter
							.next();
					if (dH.calcMiles(latitude, longitude,
							Double.parseDouble(curResult.getLatitude()),
							Double.parseDouble(curResult.getLongitude())) <= radius) {

						// make sure result isn't already in the list
						Iterator existingRecordsIter = results.iterator();
						boolean duplicate = false;
						while (existingRecordsIter.hasNext()) {
							hottiehotspots.model.Location _loc = (hottiehotspots.model.Location) existingRecordsIter
									.next();
							if (_loc.getLocationId() == curResult
									.getLocationId()) {
								duplicate = true;
								break;
							}
						}

						if (!duplicate) {
							// add record to results list
							results.add(curResult);
						}
					}
				}
			}
		}
		return results;
	}

	public void validate() {

	}

	public void prepare() throws Exception {

	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;

	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletRequest getServletRequest() {
		return request;
	}

	private Set<hottiehotspots.model.Location> searchGoogle(String query,
			String latitude, String longitude) {
		
		try
		{
			query = URLEncoder.encode(query, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("Problem trying to do URLEnconder.encode() for '" + query + "' \n" + e);
		}
		
		String url = "http://ajax.googleapis.com/ajax/services/search/local?v=1.0&"
				+ "q="
				+ query
				+ "&sll="
				+ latitude
				+ ","
				+ longitude
				+ "&mrt=localonly";
		// + "q=bar&key=INSERT-YOUR-KEY&userip=USERS-IP-ADDRESS");

		return searchGoogle(url);
	}

	@SuppressWarnings("finally")
	private Set<hottiehotspots.model.Location> searchGoogle(String urlString) {
		// This example request includes an optional API key which you will need
		// to
		// remove or replace with your own key.
		// Read more about why it's useful to have an API key.
		// The request also includes the userip parameter which provides the end
		// user's IP address. Doing so will help distinguish this legitimate
		// server-side traffic from traffic which doesn't come from an end-user.
		URL url;
		Set<hottiehotspots.model.Location> gLocalResults = new HashSet<hottiehotspots.model.Location>();

		try {

			url = new URL(urlString);

			URLConnection connection = url.openConnection();
			connection.addRequestProperty("Referer", "http://dannascimbeni.me");

			String line;
			StringBuilder builder = new StringBuilder();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			// BufferedReader reader = new BufferedReader(new
			// FileReader("/Users/dannascimbeni/Documents/eclipse/workspace/Struts/hottiehotspots/GoogleLocalSearchResultsJSON.txt"));
			while ((line = reader.readLine()) != null) {
				builder.append(line);
			}

			JSONObject json = new JSONObject(builder.toString());

			// see the Google JSON response in the log
			log.info(json.toString(2));

			// parse the results and turn them in Locations
			if (json != null) {
				Integer result = (Integer) json.get("responseStatus");
				if (result != null && result == 200) {
					// valid response
					JSONObject results = (JSONObject) json.get("responseData");
					JSONArray gResults = results.getJSONArray("results");
					for (int i = 0; i < gResults.length(); i++) {
						// iterate thru the results

						/**
						 * TODO: Create GLocalResult object to store all
						 * properties and use this object to track data before
						 * commiting - it then converts to Location obj
						 */
						hottiehotspots.model.Location newLocation = new hottiehotspots.model.Location();
						JSONObject currentResult = (JSONObject) gResults.get(i);
						newLocation.setName(currentResult
								.getString("titleNoFormatting"));
						newLocation.setLatitude(currentResult.getString("lat"));
						newLocation
								.setLongitude(currentResult.getString("lng"));
						newLocation.setAddress1(currentResult
								.getString("streetAddress"));

						if (currentResult.getString("city").indexOf(',') != -1) {
							// some responses include city and state in city
							// field... we want to remove extract just the city
							newLocation.setCity(currentResult.getString("city")
									.substring(
											0,
											currentResult.getString("city")
													.indexOf(',')));
						} else {
							newLocation
									.setCity(currentResult.getString("city"));
						}

						newLocation.setState(currentResult.getString("region"));
						newLocation.setCountry(currentResult
								.getString("country"));

						// phone
						JSONArray gPhone = currentResult
								.getJSONArray("phoneNumbers");
						if (gPhone != null)
							newLocation.setPhone(((JSONObject) gPhone.get(0))
									.getString("number"));

						gLocalResults.add(newLocation);

					}
				}
			}

		} catch (MalformedURLException e) {
			log.error(e);
		} catch (IOException e) {
			log.error(e);
		} catch (Exception e) {
			log.error(e);
		} finally {
			return gLocalResults;
		}
	}

	public String getUserDefaultLocation() {
		return userDefaultLocation;
	}

	public void setUserDefaultLocation(String userDefaultLocation) {
		this.userDefaultLocation = userDefaultLocation;
	}

	@org.apache.struts2.interceptor.validation.SkipValidation
	public String setDefaultUserArea() {
		session = ActionContext.getContext().getSession();
		setUser((User) session.get("user"));

		String city = "";
		String state = "";
		String country = "";

		if (userDefaultLocation != null) {
			// user has entered a value, map it to a formal Area
			StringTokenizer st = new StringTokenizer(userDefaultLocation, ",");
			while (st.hasMoreElements()) {
				String token = st.nextElement().toString();
				if (city.equals(""))
					city = token.trim();
				else if (state.equals(""))
					state = token.trim();
				else if (country.equals(""))
					country = token.trim();
			}

			GEOCities tempCity = null;
			List foundCities = geoCitiesService.findCitiesStartingWith(city,
					state, country);

			user.setDefaultCity((GEOCities) foundCities.get(0));

			this.userService.save(user);
			session.put("user", user);
			session.put("currentLocation", foundCities.get(0));
		} else {
			addActionError("Not a recognized location");
		}

		return "redirect";
	}

	public String search() 
    {
		session = ActionContext.getContext().getSession();
    	setUser((User)session.get("user"));
    	
    	GEOCities searchGEOLocation = getProperLocation(searchLocation);
    	
    	if(searchGEOLocation == null) {
			addActionError("'" + searchLocation + "' is not a recognized location. Please try another location.");
			return "error";
		} else {
			session.put("currentLocation", searchGEOLocation);
		}
    	
    	/**
    	 * Should have a location at this point, so let's start searching
    	 */
    	
    	// did they enter anything in the search form?
    	if(searchString != null && (searchString.trim().equalsIgnoreCase("SEARCH FOR")
    								|| searchString.trim().equals("")))
    	{
    		// nothing was entered, bring them to that location and do the usual dashboard initialization
    		return "redirect";
    	}
    	
    	// find anything that is a hotspot within 50 miles
		ArrayList hotspots = (ArrayList)getLocalHotspots(searchString, 50, searchGEOLocation);
		session.put("localHotspots", hotspots); //store hotspots for display
    	
		Set<hottiehotspots.model.Location> googleLocations = null;
		
    	// find some results via google, in case no one has tagged it yet
		if(hotspots == null || hotspots.size() < 10)
		{
			// not many hotspots for this area so lets get some suggestions
			Set<hottiehotspots.model.Location> googleSearchLocations = null;
			
			googleSearchLocations = searchGoogle(searchString, 
					Float.toString(searchGEOLocation.getLatitude()), 
					Float.toString(searchGEOLocation.getLongitude())); // TODO search based on user interests
			
			// format the results for use
			googleLocations = composeGoogleLocations(googleLocations, googleSearchLocations, "");
			
			
			
			/**
			 * determine if there are duplicates in the local hotspots and
			 * google results
			 */
			if (hotspots != null && googleLocations != null) {
				Iterator lIter = hotspots.iterator();
				while (lIter.hasNext()) {
					hottiehotspots.model.Location lResult = (hottiehotspots.model.Location) lIter
							.next();
					Iterator gIter = googleLocations.iterator();
					boolean duplicate = false;

					while (gIter.hasNext()) {
						hottiehotspots.model.Location gResult = (hottiehotspots.model.Location) gIter
								.next();
						log.info("\nComparing hotspot vs google results ");
						log.info("hotspot: \n" + "name: '"
								+ lResult.getName() + "'\n" + "lat: '"
								+ lResult.getLatitude() + "'\n" + "lng: '"
								+ lResult.getLongitude() + "'\n");
						log.info("google: \n" + "name: '"
								+ gResult.getName() + "'\n" + "lat: '"
								+ gResult.getLatitude() + "'\n" + "lng: '"
								+ gResult.getLongitude() + "'\n");

						if (lResult.getName().equalsIgnoreCase(
								gResult.getName())
								&& lResult.getLatitude().equals(
										gResult.getLatitude())
								&& lResult.getLongitude().equals(
										gResult.getLongitude())) {
							googleLocations.remove(gResult);
							duplicate = true;
							break;
						}
					}
				}
			}

			// limit the list of google results
			if (googleLocations != null && googleLocations.size() > 10) {
				// limit to 10

				Set<hottiehotspots.model.Location> limLocations = new HashSet<hottiehotspots.model.Location>();
				Iterator iter = googleLocations.iterator();
				for (int i = 0; i < 10; i++) {
					limLocations.add((hottiehotspots.model.Location) iter
							.next());
				}
				googleLocations = limLocations;

			}
			
			session.put("googleLocations", googleLocations);
		}
    	
		if(googleLocations == null && hotspots == null) {
			// no results, alert the user
			addActionError("No results for your search of '" + searchString + "' in '" + searchLocation + "'");
			return "error";
		}
		
		return Action.SUCCESS;
    }

	public void setGeoCitiesService(GEOCitiesService geoCitiesService) {
		this.geoCitiesService = geoCitiesService;
	}

	public GEOCitiesService getGeoCitiesService() {
		return geoCitiesService;
	}

	private Set<hottiehotspots.model.Location> composeGoogleLocations(
			Set<hottiehotspots.model.Location> gCollection,
			Set<hottiehotspots.model.Location> searchCollection, String category) {
		Iterator iter = searchCollection.iterator();
		
		if(gCollection == null)
		{
			// don't want a null pointer when we add
			gCollection = new HashSet<hottiehotspots.model.Location>();
		}
		
		while (iter.hasNext()) {
			hottiehotspots.model.Location curLocation = (hottiehotspots.model.Location) iter
					.next();

			curLocation.setCreatedDate(new Date());
			curLocation.setType("Business");

			if(!(category.trim().equals(""))) 
			{
				HashSet<Label> labels = (HashSet<Label>) curLocation.getLabels();
				Label myLabel = new Label(category);
				labels.add(myLabel);
				curLocation.setLabels(labels);
			}

			// find the GEOCities object to associate with this place
			/**
			 * CAN'T DO FOR PERFORMANCE REASONS
			 */
			/*
			 * ApplicationContext context = WebApplicationContextUtils
			 * .getWebApplicationContext
			 * (request.getSession().getServletContext()); GEOAddressHelper
			 * addHelper = new GEOAddressHelper(context); GEOCities locCity =
			 * addHelper.getExactCity(curLocation.getCity() + ", " +
			 * curLocation.getState() + ", " + curLocation.getCountry());
			 * curLocation.setArea(locCity);
			 */
			gCollection.add(curLocation);
		}
		
		if(gCollection.size() == 0)
		{
			// don't want to return a Set if nothing is in it
			gCollection = null;
		}
		
		return gCollection;
	}

	public void setSearchLocation(String searchLocation) {
		this.searchLocation = searchLocation;
	}

	public String getSearchLocation() {
		return searchLocation;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public String getSearchString() {
		return searchString;
	}
	
	private GEOCities getProperLocation(String typedLoc) {
		GEOCities result = null;
		
		/**
    	 * Get the location typed in by the user and figure out if it maps to a known location
    	 */
    	String city = "";
		String state = "";
		String country = "";
		
		if(searchLocation != null)
		{
			// user has entered a value, map it to a formal Area
			StringTokenizer st = new StringTokenizer(searchLocation, ",");
			while (st.hasMoreElements()) {
				String token = st.nextElement().toString();
				if(city.equals(""))
					city = token.trim();
				else if(state.equals(""))
					state = token.trim();
				else if(country.equals(""))
					country = token.trim();
			}
			
			/**
			 * Find the location the user typed in
			 */
			List foundCities;
			if(state.equals("") && country.equals("") && !city.equals(""))
			{
				//only entered a city
				foundCities = geoCitiesService.findCitiesStartingWith(city);
			} else {
				foundCities = geoCitiesService.findCitiesStartingWith(city, state, country);
			}
			
			
			if(foundCities != null)
			{
				result = (GEOCities)foundCities.get(0);
			}
		}
		
		return result;
	}
	
	private void prepareNewestHotspotsList() {
		if(session != null) {
			
			// get the newest Hotspots in the entire system
			ArrayList<Location> results = (ArrayList<Location>) hotspotService.findNewestHotspots(5);
			
			session.put("newestHotspots", results);
		}
	}
	
	private void prepareTopHotspotsList() {
		if(session != null) {
			
			// get the top rated Hotspots in the entire system
			ArrayList<Location> results = (ArrayList<Location>) hotspotService.findTopRatedHotspots(3);
			
			session.put("topHotspots", results);
		}
	}

}
