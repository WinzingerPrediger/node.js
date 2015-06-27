package pkg;

import java.io.Serializable;

public class MyType implements Serializable {
	private String someAttribute;

	public MyType(String s) {
		this.someAttribute = s;
	}

	public String toString() {
		return "att:"+someAttribute;
	}
}