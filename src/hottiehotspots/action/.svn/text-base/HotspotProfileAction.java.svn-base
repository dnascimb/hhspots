package hottiehotspots.action;

import hottiehotspots.general.LabelHelper;
import hottiehotspots.general.RatingManager;
import hottiehotspots.model.GEOCities;
import hottiehotspots.model.Hotspot;
import hottiehotspots.model.HotspotRating;
import hottiehotspots.model.Label;
import hottiehotspots.model.Location;
import hottiehotspots.model.User;
import hottiehotspots.service.LocationService;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
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

public class HotspotProfileAction extends ActionSupport implements SessionAware, ServletRequestAware {
	
	
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


    public HotspotProfileAction(LocationService service) {
        this.service = service;
    }
    
    @org.apache.struts2.interceptor.validation.SkipValidation
    public String execute() {
    	
    	session = ActionContext.getContext().getSession();
    	
    	if(id == null)
    		id = (String)request.getAttribute("id");
    	
    	log.info("Value of 'id': " + id);
    	if(id == null)
    	{
    		// need an id, forward the user back to the dashboard
    		return "unrecoverable_error";
    	}
    	
		hotspot = (Location)service.findById(new Integer(id));
	
		if(hotspot == null) 
		{
			//couldn't find it...
			return "unrecoverable_error";
		}
		
		Double dRating = hotspot.getHotspot().getCurrentRating();
		rating = (int)Float.parseFloat(dRating.toString());
		
		rating = rating/20;
	
    	
        return Action.SUCCESS;
    }
    
    public void validate()
    {
    	
    }
      
    public String review()
    {
    	currentLocation = (GEOCities)session.get("currentLocation");
    	setUser((User)session.get("user"));
    	
    	context = WebApplicationContextUtils
        .getWebApplicationContext(request.getSession().getServletContext());
    	
    	hotspot = (Location)service.findById(new Integer(id));
    	
		if(hotspot == null) 
		{
			//couldn't find it...
			return "unrecoverable_error";
		}
		
		cleanUpLabelsData();
		
    	// save the Hotspot Object with a new rating
    	
    	Hotspot theHotspot = hotspot.getHotspot();
    	
    	RatingManager rManager = new RatingManager();
    	
    	theHotspot.setCurrentRating(rManager.calculateTemperature(theHotspot, rating));
    	theHotspot.setTimesRated(theHotspot.getTimesRated() + 1);
    	
    	HotspotRating hRating = new HotspotRating();
    	
    	hRating.setComment(review);
    	hRating.setRating(rManager.calculateTemperature(rating));
    	hRating.setTimeDateStamp(new Date());
    	hRating.setRatedBy(user.getUserName());
    	
    	theHotspot.getRatings().add(hRating);
    	hotspot.setHotspot(theHotspot);
    	
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
    	
    	Double dRating = theHotspot.getCurrentRating();
		rating = (int)Float.parseFloat(dRating.toString());
		
		rating = rating/20;
	
    	// all set, clean the session and let the user know
		addActionMessage("Thanks for rating this hotspot!");		
		
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

	
	
	private void cleanUpLabelsData() {
		
		
		// USING StringTokenizer instead of .split because we don't want empties and have single delimiter
		StringTokenizer stTok = new StringTokenizer(labels,",");
		while(stTok.hasMoreElements()){
    		Label curLabel = new Label(((String)stTok.nextElement()).trim());
    		hotspot.getLabels().add(curLabel);
    	}
		
		LabelHelper labelHelper = new LabelHelper(context);
		hotspot.setLabels(labelHelper.replaceWithPersistedLabels(hotspot.getLabels()));
	
	}

	public void setCurrentLocation(GEOCities currentLocation) {
		this.currentLocation = currentLocation;
	}

	public GEOCities getCurrentLocation() {
		return currentLocation;
	}
}
