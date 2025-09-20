import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { PageProps } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    // padding: 4,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "row",
    backgroundColor: "#f8fafc",
  },
  left: {
    width: "35%",
    // backgroundColor: "#193042",
    color: "white",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: "100%",
  },
  right: {
    width: "65%",
    padding: 16,
    color: "#eef5ff",
    minHeight: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  heading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
    color: "#fff",
  },
  rightHeading: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
    color: "#374151",
  },
  section: {
    marginBottom: 16,
    marginTop: 16,
  },
  experienceSection: {
    marginBottom: 10,
    marginTop: 16,
  },
  persnolInfoSection: {
    marginBottom: 16,
    marginTop: 6,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  rightdivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    marginBottom: 4,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 4,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: 500,
  },
  skillslistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: 500,
  },
  languagelistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: 500,
  },
  certificationlistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: 500,
  },
  ExperienceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginBottom: 4,
    marginLeft: 0,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "bold",
    // lineHeight: 1.5,
    color: "#374151",
  },
  bullet: {
    fontSize: 10,
    color: "white",
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  bulletPersonal: {
    fontSize: 10,
    color: "#193042",
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  bulletRight: {
    fontSize: 14,
    color: "#193042",
    marginRight: 6,
    marginTop: 0,
    width: 14,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 1.2,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    color: "white",
  },
  position: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
  },
  contact: {
    fontSize: 10,
    fontWeight: 600,
    marginTop: 8,
    marginBottom: 2,
    color: "#374151",
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#374151",
  },
  projectLink: {
    fontSize: 10,

    marginRight: 15,
    textDecoration: "none",
    color: "#374151",
  },
  projectLinksContainer: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 5,
  },
});

function getBulletChar(color: string = "white") {
  return "•";
}

export default function Template1PDF({
  data,
  color,
  size,
}: {
  data: any;
  color: any;
  size: PageProps["size"];
}) {
  return (
    <Document>
      <Page size={size} style={styles.page}>
        {/* Left Side */}
        <View
          style={{
            ...styles.left,
            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
          }}
        >
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.divider} />

          <View style={{ ...styles.section, width: "80%" }}>
            <Text style={styles.heading}>Education</Text>
            {data.education?.map((item: any, i: number) => (
              <View
                key={i}
                style={{
                  ...styles.listItem,
                }}
              >
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item.degree}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            {data.skills?.map((item: any, i: number) => (
              <View key={i} style={styles.skillslistItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.heading}>Languages</Text>
            {data.languages?.map((item: any, i: number) => (
              <View key={i} style={styles.languagelistItem}>
                <Text style={styles.bullet}>{getBulletChar()}</Text>
                <Text>{item}</Text>
              </View>
            ))}
          </View>
          {data.certifications.length > 0 && <View style={styles.divider} />}
          {data.certifications.length > 0 && (
            <View style={{ ...styles.section, width: "80%" }}>
              <Text style={styles.heading}>Certifications</Text>
              {data.certifications?.map((item: any, i: number) => (
                <View key={i} style={styles.certificationlistItem}>
                  <Text style={styles.bullet}>{getBulletChar()}</Text>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {data.customSection && data.customSection.length > 0 && (
            <View>
              {data.customSection?.map((item: any, i: number) => (
                <View key={i}>
                  <View style={styles.divider} />
                  <View style={{ ...styles.section, width: "80%" }}>
                    <Text
                      style={{ ...styles.heading, textTransform: "capitalize" }}
                    >
                      {item.title}
                    </Text>

                    {item.value.map((item: any, i: number) => (
                      <View key={i} style={styles.certificationlistItem}>
                        <Text style={styles.bullet}>{getBulletChar()}</Text>
                        <Text style={{ textTransform: "capitalize" }}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Side */}
        <View style={styles.right}>
          <Text style={styles.position}>{data.role}</Text>

          {data.personalInformation && data.personalInformation.length > 0 && (
            <View style={styles.persnolInfoSection}>
              <View style={{ width: "80%" }}>
                {data.personalInformation.map((item: any, i: number) => (
                  <View
                    key={i}
                    style={{
                      ...styles.listItem,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#193042",
                          fontWeight: 600,
                          fontSize: 10,
                          textTransform: "capitalize",
                        }}
                      >
                        {item.title}:
                      </Text>
                      <Text
                        style={{
                          color: "#193042",
                          fontWeight: 400,
                          fontSize: 10,
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.rightdivider} />
          <View style={styles.section}>
            <Text style={styles.rightHeading}>Summary</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data.summary.split(" ").map((word: string, i: number) => (
                <Text
                  key={i}
                  style={{
                    lineHeight: 1.5,
                    color: "#374151",
                    fontSize: 11,
                    fontWeight: 400,
                    marginRight: 4,
                  }}
                >
                  {word}
                </Text>
              ))}
            </View>
          </View>

          {data.experience.length > 0 && <View style={styles.rightdivider} />}
          {data.experience.length > 0 && (
            <View style={styles.experienceSection}>
              <Text style={styles.rightHeading}>Experience</Text>
              {data.experience?.map((item: any, i: number) => (
                <View
                  key={i}
                  style={{ marginBottom: 0, flexDirection: "column" }}
                >
                  <View style={styles.ExperienceItem}>
                    <Text style={styles.bulletRight}>
                      {getBulletChar("#193042")}
                    </Text>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#374151",
                          fontSize: 10,
                        }}
                      >
                        {item.companyName}
                      </Text>
                      <Text
                        style={{
                          color: "#374151",
                          fontSize: 10,
                          marginTop: 2,
                          fontWeight: 500,
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      lineHeight: 1.2,
                      color: "#374151",
                      fontSize: 11,
                      fontWeight: 400,
                      marginLeft: 20,
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontStyle: "italic",
                      color: "#374151",
                      fontSize: 8,
                    }}
                  >
                    {`
                    (${moment(item.startDate).format("MMM YYYY")} - ${
                      item.endDate === "Currently Working"
                        ? "Currently Working"
                        : moment(item.endDate).isValid()
                        ? moment(item.endDate).format("MMM YYYY")
                        : ""
                    })
                    
                    `}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {data.projects.length > 0 && <View style={styles.rightdivider} />}

          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.rightHeading}>Projects</Text>
              {data.projects?.map((item: any, i: number) => (
                <View
                  key={i}
                  style={{ marginBottom: 8, flexDirection: "column" }}
                >
                  <View style={styles.listItem}>
                    <Text style={styles.bulletRight}>
                      {getBulletChar("#193042")}
                    </Text>
                    <Text style={styles.projectTitle}>{item.name}</Text>
                  </View>
                  <Text
                    style={{
                      lineHeight: 1.2,
                      color: "#374151",
                      fontSize: 11,
                      fontWeight: 400,
                      marginLeft: 20,
                    }}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.projectLinksContainer}>
                    <Link style={styles.projectLink} src={item.github}>
                      GitHub
                    </Link>
                    <Link style={styles.projectLink} src={item.live}>
                      Live Demo
                    </Link>
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.customSection2 && data.customSection2.length > 0 && (
            <View>
              {data.customSection2.map((item: any, i: number) => (
                <View key={i}>
                  <View style={styles.rightdivider} />
                  <View style={styles.section}>
                    <Text
                      style={{
                        ...styles.rightHeading,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.title}
                    </Text>
                    {item.value.map((item: any, i: number) => (
                      <View style={styles.listItem} key={i}>
                        <Text style={styles.bulletRight}>
                          {getBulletChar("#193042")}
                        </Text>
                        <Text
                          style={{
                            lineHeight: 1.2,
                            color: "#374151",
                            fontSize: 11,
                            // letterSpacing: 0.2,
                            fontWeight: 400,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
