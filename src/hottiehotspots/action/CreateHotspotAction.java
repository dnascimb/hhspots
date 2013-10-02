package hottiehotspots.action;

import hottiehotspots.general.LabelHelper;
import hottiehotspots.general.MenuHelper;
import hottiehotspots.general.RatingManager;
import hottiehotspots.model.GEOCities;
import hottiehotspots.model.GEORegions;
import hottiehotspots.model.Hotspot;
import hottiehotspots.model.HotspotRating;
import hottiehotspots.model.Label;
import hottiehotspots.model.Location;
import hottiehotspots.model.User;
import hottiehotspots.service.LocationService;

import java.util.Date;
import java.util.HashMap;
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
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class CreateHotspotAction extends ActionSupport implements SessionAware, ServletRequestAware {
	
	
	private static final long serialVersionUID = -2129597417800830655L;	
	private LocationService service;
	private Location hotspot;
    private User user;
    private Map session;
    private HttpServletRequest request;
    private GEOCities currentLocation;
    private ApplicationContext context;
    
    private List hotspotTypes;
    private Map<String, String> ratings;
    private Integer rating;
    private static final Log  log = LogFactory.getLog(DashboardAction.class);
    private String id;
    private String labels = "";
    private String address = "";
    private String review = "";


    public CreateHotspotAction(LocationService service) {
        this.service = service;
    }
    
    @org.apache.struts2.interceptor.validation.SkipValidation
    public String execute() {
    	
    	session = ActionContext.getContext().getSession();
    	session.put("menu", MenuHelper.ADDHOTSPOT); //highlight the correct menu item
    	
    	id = (String)request.getAttribute("id");
    	
    	log.info("Value of 'id': " + id);
    	
    	Set<hottiehotspots.model.Location> googleLocations;
		
		googleLocations = (Set<Location>)session.get("googleLocations");
	
		// figure out what location was selected
    	Integer gCount = 1;
    	Integer match = Integer.valueOf(id);
    	Iterator iter = googleLocations.iterator();
		while (iter.hasNext()) 
		{
			hottiehotspots.model.Location curLocation = (hottiehotspots.model.Location)iter.next();
			if(gCount == match) {
				hotspot = curLocation;
				loadHotspotData();
				break;
			}
			gCount++;
						
		}
		
		
    	//initialize first time in
    	if(hotspot == null)
		{
    		hotspot = new Location();
    		hotspot.setType("Place");
		}
    	
        return Action.SUCCESS;
    }
    
    public void validate()
    {
    	//required fields
    	if(hotspot.getName().trim().equals(""))
    	{
    		addFieldError("hotspot.name", "Name is required");
    	}
    	
    	if(hotspot.getAddress1().trim().equals(""))
    	{
    		addFieldError("hotspot.address1", "Address 1 is required");
    	} 
  	
    	if(getFieldErrors().size() == 0) {
	    	boolean isDuplicate = service.isDuplicate(hotspot);
	    	if(isDuplicate)
	    	{
	    		addActionError("A HottieHotspot with this information already exists!");
	    	}   		
    	}
    	
    	/*
    	 * Have to validate rating this way since we aren't using Struts to generate the radio controls
    	 */
    	session = ActionContext.getContext().getSession();
    	session.put("menu", MenuHelper.ADDHOTSPOT); //highlight the correct menu item
    	
    	rating = (Integer)request.getAttribute("rating");
    	
    	log.info("Value of 'rating': " + rating);
    	
    	if(rating == null)
    	{
    		addActionError("Please Enter A Rating");
    	}
    }
      
    public String create()
    {
    	currentLocation = (GEOCities)session.get("currentLocation");
    	setUser((User)session.get("user"));
    	
    	context = WebApplicationContextUtils
        .getWebApplicationContext(request.getSession().getServletContext());
    	
    	cleanUpAddressData();
    	cleanUpLabelsData();
    	
    	// save the Location and save Hotspot Object and other misc. items
    	RatingManager rManager = new RatingManager();
    	
    	Hotspot theHotspot = new Hotspot();
    	theHotspot.setCurrentRating(rManager.calculateTemperature(rating));
    	theHotspot.setTimesRated(1);
    	theHotspot.setOriginallyTaggedDate(new Date());
    	theHotspot.setOriginallyTaggedBy(user.getUserName());
    	
    	HotspotRating hRating = new HotspotRating();
    	hRating.setComment(review);
    	hRating.setRating(rManager.calculateTemperature(rating));
    	hRating.setTimeDateStamp(new Date());
    	hRating.setRatedBy(user.getUserName());
    	
    	HashSet<HotspotRating> hRatings = (HashSet<HotspotRating>)theHotspot.getRatings();
    	hRatings.add(hRating);
    	theHotspot.setRatings(hRatings);
    	hotspot.setHotspot(theHotspot);
    	
    	hotspot.setType("Place");
    	hotspot.setCreatedDate(new Date());
    	
    	try {
    		this.service.save(hotspot);
    	}
    	catch(Exception e) {
    		if(e.getMessage().equals("duplicate"))
    			addActionError("There is already an entry for this Hotspot");
    		else
    			addActionError("Sorry, we couldn't tag this Hotspot at this time. Please try again later.");	
    		
    		return "error";
    	}
    	// all set, clean the session and let the user know
		addActionMessage("This HottieHotspot has been added!");		
		
		return "success";
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Location getHotspot() {
        return hotspot;
    }

    public void setHotspot(Location hotspot) {
        this.hotspot = hotspot;
    }
    
    public List getHotspotTypes(){
        return hotspotTypes;
      }
    
    public Map<String,String> getRatings(){
        return ratings;
      }
    
    public void setRatings(Map<String,String> ratings) {
    	this.ratings = ratings;
    }
    
    public Integer getRating(){
        return rating;
      }
    public void setRating(Integer rating){
    	this.rating = rating;
    }
    
    private void loadHotspotData() {
    	StringBuffer sbLabels = new StringBuffer("");
    	StringBuffer sbAddress = new StringBuffer("");
    	Iterator iter = hotspot.getLabels().iterator();
    	
    	// create labels string for page
    	while(iter.hasNext()) {
    		Label curLabel = (Label)iter.next();
    		sbLabels.append(curLabel.getLabel());
    		if(iter.hasNext()) { sbLabels.append(", "); }
    	}
    	labels = sbLabels.toString();
    	
    	// create City, Region, Zip string
    	if(hotspot.getCity() != null) {
    		sbAddress.append(hotspot.getCity());
    	}
    	if(hotspot.getState() != null) {
    		sbAddress.append(", " + hotspot.getState());
    	}
    	if(hotspot.getPostalCode() != null) {
    		sbAddress.append(" " + hotspot.getPostalCode());
    	}
    	address = sbAddress.toString();
    }
    
	@Override
	public void setSession(Map<String, Object> arg0) {
		this.session = arg0;
		
	}
	
	public void setServletRequest(HttpServletRequest request){
	    this.request = request;
	}

	public HttpServletRequest getServletRequest(){
	   return request;
	}
	
	public void setId(String id) { this.id = id; }
	public String getId() { return id; }
   
	public String getLabels() {
		return labels;
	}

	public void setLabels(String labels) {
		this.labels = labels;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddress() {
		return address;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getReview() {
		return review;
	}

	private void cleanUpAddressData() {
		// address data missing... fill it in
    	if(address != null && address.toString().trim().equals(""))
    	{
    		//screen didn't have regional info
    		if(hotspot.getCity() != null && hotspot.getCity().trim().equals(""))
    		{
    			//no city info, take from referenced GEOCity
    			hotspot.setCity(currentLocation.getCity());
    		}
    		if(hotspot.getState() != null && hotspot.getState().trim().equals(""))
    		{
    			// no Region info, take from referenced GEOCity.GEORegion
    			GEORegions region = hotspot.getArea().getRegionId();
    			hotspot.setState(currentLocation.getRegionId().getRegion());
    		}
    		if(hotspot.getCountry() != null && hotspot.getCountry().trim().equals(""))
    		{
    			hotspot.setCountry(currentLocation.getCountryId().getCountry());
    		}
    		// don't care about postal really... not tracking by it anywhere
    		
    	} else {
    		// determine if single parts are missing from address
    	/*	
    		String first = "";
    		String second = "";
    		String third = "";
    		
    		String[] result = address.toString().split(",");
    	    
    		first = result[0];
    		
    		if(result.length > 1)
    			second = result[1].trim();
    		if(result.length > 2)
    			third = result[2].trim();
    		
    		if(!(third.equals("")) && !(second.equals("")))
    		{
    			
    		}
    		
    		// city
    		
    		// state
    		
    		// postal
    		 
    		 */
    	}
    	
    	// associate with current location (best we have) since we can't guarantee that 
    	// - the data filled in on the address lines is correct
    	// - we have a match in the GEO database
    	hotspot.setArea(currentLocation);
	}
	
	private void cleanUpLabelsData() {
		HashSet<Label> theLabels = new HashSet<Label>();
		// take labels string from the page and put it into a Set for storage
		
		// USING StringTokenizer instead of .split because we don't want empties and have single delimiter
		StringTokenizer stTok = new StringTokenizer(labels,",");
		while(stTok.hasMoreElements()){
    		Label curLabel = new Label(((String)stTok.nextElement()).trim());
    		theLabels.add(curLabel);
    	}
		
		LabelHelper labelHelper = new LabelHelper(context);
		hotspot.setLabels(labelHelper.replaceWithPersistedLabels(theLabels));
	
	}

	public void setCurrentLocation(GEOCities currentLocation) {
		this.currentLocation = currentLocation;
	}

	public GEOCities getCurrentLocation() {
		return currentLocation;
	}
}
