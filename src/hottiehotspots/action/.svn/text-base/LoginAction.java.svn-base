package hottiehotspots.action;

import hottiehotspots.general.HHProperties;
import hottiehotspots.model.User;
import hottiehotspots.service.LoginService;

import java.util.Map;

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
import com.opensymphony.xwork2.Preparable;

public class LoginAction extends ActionSupport implements Preparable, SessionAware, ServletRequestAware {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2544724232466600709L;
	private LoginService service;
    private User theUser;
    private Map session;
	private HttpServletRequest request;
	private static final Log log = LogFactory.getLog(LoginAction.class);

    public LoginAction(LoginService service) {
        this.service = service;
    }
    
    @org.apache.struts2.interceptor.validation.SkipValidation
    public String execute() {
    	
    	
    	
        return Action.SUCCESS;
    }
    
    public void validate()
    {
    	if(getTheUser().getUserName().trim().equals(""))
    	{
    		addFieldError("theUser.userName", "");
    	}
    	if(getTheUser().getPassword().trim().equals(""))
    	{
    		addFieldError("theUser.password", "");
    	} 

    	if(getFieldErrors().size() < 1) {
    	
	    	User dbUser = null;
			dbUser = this.service.login(getTheUser());
			
			if(dbUser == null)
			{
				// not a valid user
				addFieldError("theUser.password","Login credentials invalid");
			} else {
				theUser = dbUser;
			}
			
			
    	}
    }

    public void prepare() throws Exception {
        
    }

    public String login()
    {
    	// Code fragment from class implementing SessionAware containing the 
    	// session map in a instance variable "session". Attempting to invalidate 
    	// an already-invalid session will result in an IllegalStateException.
    	if (session instanceof org.apache.struts2.dispatcher.SessionMap) {
    	    try {
    	        ((org.apache.struts2.dispatcher.SessionMap) session).invalidate();
    	    } catch (IllegalStateException e) {
    	        log.error("Invalidating Session", e);
    	    }
    	}
    	
		session = ActionContext.getContext().getSession();
		session.put("user", theUser);
		
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
    	
    	
		return "redirect";
    }
    public User getTheUser() {
        return theUser;
    }

    public void setTheUser(User theUser) {
        this.theUser = theUser;
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
}
