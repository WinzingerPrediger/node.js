package pkg;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.platform.Verticle;

import org.vertx.java.core.json.JsonObject;

public class Receiver extends Verticle {
	public void start() {
        EventBus eb = vertx.eventBus();

        Handler<Message<JsonObject>> myHandler = new Handler<Message<JsonObject>>() {
        	public void handle(Message<JsonObject> message) {
        		System.out.println("[RECEIVER (Java)      ] received message: "+message.body());
        	}
        };
     
        eb.registerHandler("test.address", myHandler);
        System.out.println("[RECEIVER (Java)      ] receiver ready"); 
    }
}