package hottiehotspots.general;

import hottiehotspots.model.Label;
import hottiehotspots.service.GEOAddressHelper;
import hottiehotspots.service.GEOCitiesService;
import hottiehotspots.service.GEOCountriesService;
import hottiehotspots.service.GEORegionsService;
import hottiehotspots.service.LabelService;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

public class LabelHelper {

	LabelService labelService;
	private static final Log  log = LogFactory.getLog(LabelHelper.class);

	public LabelHelper(ApplicationContext appContext) {
		this.labelService = (LabelService)appContext.getBean("labelService");
	}
	
	public LabelHelper(LabelService labelService) {
		this.labelService = labelService;
	}
	
	public Set<Label> replaceWithPersistedLabels(Set<Label> list) {
		// determines if we have persisted Label entries or not
		
		HashSet<Label> newList = new HashSet<Label>();
		
		if(list != null && list.size() > 0)
		{
			
			Iterator iter = list.iterator();
			
			while(iter.hasNext())
			{
				Label curLabel = (Label)iter.next();
				Label result = labelService.find(curLabel);
				
				if(result != null){
					newList.add(result);
				}
				else {
					newList.add(curLabel);
				}
			}
		}
		return newList;
	}
}
