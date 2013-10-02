package hottiehotspots.action;

import hottiehotspots.general.HHProperties;
import hottiehotspots.model.GEOCities;
import hottiehotspots.model.User;
import hottiehotspots.service.GEOAddressHelper;
import hottiehotspots.service.GEOCitiesService;
import hottiehotspots.service.UserService;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

public class ProfileUpdateAction extends ActionSupport implements Preparable,
		SessionAware, ServletRequestAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6259538726071481252L;
	private UserService userService;
	private GEOCitiesService geoCitiesService;
	private User user;
	private String userLocationString;
	private Map session;
	private GEOCities userLocation;
	private HttpServletRequest request;
	private List json;
	private String currentCityString;
	private GEOCities locationCheck;
	private String passwordFromSession;

	public ProfileUpdateAction(GEOCitiesService service, UserService service2) {
	     this.geoCitiesService = service;
	     this.userService = service2;
	    }
	
	@org.apache.struts2.interceptor.validation.SkipValidation
	public String execute() {
		setUser((User) session.get("user"));
		if (getUser() == null) {
			// user is not logged in kick them back to the login page
			return "homepage";
		}
		session = ActionContext.getContext().getSession();
	/*	session.put("menu", MenuHelper.PROFILE); // highlight the correct menu
												 // item - no longer necessary, menu handling changed.
	*/
		currentCityString = user.getDefaultCity().getCity()
		+ ", " 
		+ user.getDefaultCity().getRegionId().getRegion()
		+ ", "
		+ user.getDefaultCity().getCountryId().getCountry();
		
		/*
    	 * setup session variables
    	 */
    	ApplicationContext context = WebApplicationContextUtils
				.getWebApplicationContext(request.getSession()
						.getServletContext());
    	
    	HHProperties imagesLocation = (HHProperties) context
		.getBean("hhProperties");

    	session.put("images-location", imagesLocation.getImageLocation());
    	session.put("images-location-url", imagesLocation.getImageLocationURL());
    	session.put("images-stock-url", imagesLocation.getImageStockURL());
    	
		return Action.SUCCESS;
	}

	public String save() {
		
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
		
		GEOAddressHelper addressGEOCity = new GEOAddressHelper(context);
		
		user.setDefaultCity(addressGEOCity.getExactCity(currentCityString));
		
		userService.save(user);
		
		session.put("user", user);

		addActionMessage("Your profile has been updated!");

		return Action.SUCCESS;
	}

	public void validate() {
		
		if (getUser().getUserName().trim().equals("")) {
			addFieldError("user.userName", "Username is required!");
		}

		// TODO location validator to see if user has changed
		// the location to an invalid location
		
		// First, see if the location has changed between the session and the page.
		// If not, then skip location validation.  Otherwise, validate what's
		// on the form.
		setUserLocation(((User)session.get("user")).getDefaultCity());
		
		userLocationString = getUserLocation().getCity() + ", " 
		+ getUserLocation().getRegionId().getRegion() + ", " 
		+ getUserLocation().getCountryId().getCountry();
		
		if (!(userLocationString.equals(currentCityString)))
		{
			ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
			
			GEOAddressHelper addressGEOCity = new GEOAddressHelper(context);
			
			 locationCheck = addressGEOCity.getExactCity(currentCityString);
			
			if ((locationCheck == null))
			{
				addFieldError("userCity", "Cannot determine your location!");
			}
		}
		
		//update password if it's been changed
		setPasswordFromSession(((User)session.get("user")).getPassword());
		if (getUser().getPassword().trim().equals(""))
		{
			user.setPassword(getPasswordFromSession());
		}
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
	
	public void setServletRequest(HttpServletRequest request){
	    this.request = request;
	}

	public HttpServletRequest getServletRequest(){
	   return request;
	}
	
	public String getCurrentCityString() {
		return currentCityString;
	}

	public void setCurrentCityString(String currentCityString) {
		this.currentCityString = currentCityString;
	}

	public GEOCities getUserLocation() {
		return userLocation;
	}

	public void setUserLocation(GEOCities userLocation) {
		this.userLocation = userLocation;
		}

	public String getPasswordFromSession() {
		return passwordFromSession;
	}

	public void setPasswordFromSession(String passwordFromSession) {
		this.passwordFromSession = passwordFromSession;
	}
}