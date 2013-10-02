package hottiehotspots.action;


import hottiehotspots.model.User;
import hottiehotspots.service.UserService;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.Preparable;
import com.opensymphony.xwork2.ValidationAware;

public class RegisterAction extends ActionSupport implements ValidationAware, Preparable, SessionAware {
    /**
	 * 
	 */
	private static final long serialVersionUID = 693653853992061521L;
	private static final Log  log = LogFactory.getLog(RegisterAction.class);
	private UserService service;
    private User user;
    private Map session;
    
    public RegisterAction(UserService service) {
        this.service = service;
    }

    @org.apache.struts2.interceptor.validation.SkipValidation
    public String execute() {
    	
        return Action.SUCCESS;
    }

    public String save() {
    	
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
    	
        this.service.save(user);
       
        session = ActionContext.getContext().getSession();
		session.put("user", user);
        
        return "redirect";
    }
    
    public void validate()
    {
    	if(getUser().getUserName().trim().equals(""))
    	{
    		addFieldError("user.userName", "");
    	}
    	else if(this.service.userExists(getUser().getUserName()))
    	{
    		addFieldError("user.userName", "Username '" + user.getUserName() + "' already exists");
    	}
    	
    	if(getUser().getEmail().trim().equals("")) {
    		addFieldError("user.email", "");
    	} else {
    		User tempUser = new User();
    		tempUser.setEmail(getUser().getEmail());
    		User result = this.service.find(tempUser);
    		
    		if(result != null) {
    			addFieldError("user.email", "Email already exists");
    		}
    	}
    	
    	if(getUser().getPassword().trim().equals("")) {
    		addFieldError("user.password", "");
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

}
