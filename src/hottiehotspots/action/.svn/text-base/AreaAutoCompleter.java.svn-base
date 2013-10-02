package hottiehotspots.action;

import hottiehotspots.general.AutoCompleteEntry;
import hottiehotspots.model.GEOCities;
import hottiehotspots.service.GEOAddressHelper;
import hottiehotspots.service.GEOCitiesService;

import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable;

public class AreaAutoCompleter extends ActionSupport implements Preparable, SessionAware, ServletRequestAware {
	   private String city;
	   private List json;
	   private GEOCitiesService service;
	   private HttpServletRequest request;
	   private Map session;

	   public AreaAutoCompleter(GEOCitiesService service) {
	        this.service = service;
	    }

	    public String execute() {
	    	
	    	ApplicationContext context = WebApplicationContextUtils
	        .getWebApplicationContext(request.getSession().getServletContext());
	    	
	        json = new Vector();

	        AutoCompleteEntry acEntry;
	        String fullLabel;
	        city = request.getParameter("term");
	        
	        GEOAddressHelper helper = new GEOAddressHelper(context);
	        List<GEOCities> cities = helper.getListofCities(city);
	        
	        for(GEOCities acity: cities) {
	        	fullLabel = new String();
            	fullLabel = acity.getCity() + ", " + acity.getRegionId().getRegion() + ", " + acity.getCountryId().getCountry();
            	acEntry = new AutoCompleteEntry();
            	acEntry.setId(acity.getCityId().toString());
            	acEntry.setLabel(fullLabel);
            	acEntry.setValue(fullLabel);
                json.add(acEntry);
	        }

	        return SUCCESS;
	    }

	    public void setCity(String city) {
	        this.city = city;
	    }

	    public List getJson() {
	        return json;
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
		public void prepare() throws Exception {
		        
		}

}
